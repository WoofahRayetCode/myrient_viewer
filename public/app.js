class MyrientViewer {
    constructor() {
        this.currentPath = '';
        this.queue = [];
        this.isQueueVisible = false;
        this.isDesktop = false;
        
        this.initializeElements();
        this.attachEventListeners();
        this.checkAppInfo();
        this.loadDirectory('');
        this.refreshQueue();
    }

    initializeElements() {
        // Main elements
        this.fileList = document.getElementById('file-list');
        this.breadcrumb = document.getElementById('breadcrumb');
        this.browserStats = document.getElementById('browser-stats');
        this.searchInput = document.getElementById('search-input');
        
        // Queue elements
        this.queueSidebar = document.getElementById('queue-sidebar');
        this.queueToggle = document.getElementById('queue-toggle');
        this.queueCount = document.getElementById('queue-count');
        this.queueList = document.getElementById('queue-list');
        this.queueItemsCount = document.getElementById('queue-items-count');
        this.queueTotalSize = document.getElementById('queue-total-size');
        
        // Loading
        this.loadingOverlay = document.getElementById('loading-overlay');
        this.toastContainer = document.getElementById('toast-container');
    }

    attachEventListeners() {
        // Queue toggle
        this.queueToggle.addEventListener('click', () => this.toggleQueue());
        
        // Queue actions
        document.getElementById('close-queue').addEventListener('click', () => this.hideQueue());
        document.getElementById('clear-queue').addEventListener('click', () => this.clearQueue());
        
        // Browser controls
        document.getElementById('refresh-btn').addEventListener('click', () => this.refreshDirectory());
        this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        
        // Export buttons
        document.querySelectorAll('.export-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const format = e.target.getAttribute('data-format');
                this.exportQueue(format);
            });
        });
    }

    async loadDirectory(path) {
        try {
            this.showLoading();
            this.currentPath = path;
            
            const response = await fetch(`/api/browse/${path}`);
            if (!response.ok) throw new Error('Failed to load directory');
            
            const data = await response.json();
            this.renderDirectory(data);
            this.updateBreadcrumb(path);
            this.updateStats(data);
            
        } catch (error) {
            console.error('Error loading directory:', error);
            this.showToast('Failed to load directory', 'error');
        } finally {
            this.hideLoading();
        }
    }

    renderDirectory(data) {
        this.fileList.innerHTML = '';
        
        if (data.items.length === 0) {
            this.fileList.innerHTML = `
                <div class="loading-spinner">
                    <span>No files found in this directory</span>
                </div>
            `;
            return;
        }

        data.items.forEach(item => {
            const fileElement = this.createFileElement(item);
            this.fileList.appendChild(fileElement);
        });
    }

    createFileElement(item) {
        const div = document.createElement('div');
        div.className = 'file-item';
        
        const iconClass = `icon-${item.type}`;
        const isInQueue = this.queue.some(qItem => qItem.url === item.url);
        
        div.innerHTML = `
            <div class="file-icon ${iconClass}"></div>
            <div class="file-info">
                <div class="file-name">${this.escapeHtml(item.name)}</div>
                <div class="file-meta">
                    <span>Size: ${item.size}</span>
                    <span>Modified: ${item.lastModified}</span>
                </div>
            </div>
            <div class="file-actions">
                ${!item.isDirectory ? `
                    <button class="btn btn-xs ${isInQueue ? 'btn-secondary' : 'btn-success'}" 
                            onclick="app.${isInQueue ? 'removeFromQueue' : 'addToQueue'}('${this.escapeAttribute(item.url)}', '${this.escapeAttribute(item.name)}', '${this.escapeAttribute(item.size)}')"
                            title="${isInQueue ? 'Remove from queue' : 'Add to queue'}">
                        ${isInQueue ? '✓' : '+'}
                    </button>
                ` : ''}
            </div>
        `;

        if (item.isDirectory) {
            div.style.cursor = 'pointer';
            div.addEventListener('click', () => {
                this.loadDirectory(item.path.replace(/\/$/, ''));
            });
        }

        return div;
    }

    updateBreadcrumb(path) {
        const parts = path ? path.split('/').filter(p => p) : [];
        
        this.breadcrumb.innerHTML = `
            <span class="breadcrumb-item ${!path ? 'active' : ''}" onclick="app.loadDirectory('')">files</span>
        `;
        
        let currentPath = '';
        parts.forEach((part, index) => {
            currentPath += part;
            const isLast = index === parts.length - 1;
            
            const separator = document.createElement('span');
            separator.className = 'breadcrumb-separator';
            separator.textContent = '/';
            this.breadcrumb.appendChild(separator);
            
            const item = document.createElement('span');
            item.className = `breadcrumb-item ${isLast ? 'active' : ''}`;
            item.textContent = part;
            
            if (!isLast) {
                item.onclick = () => this.loadDirectory(currentPath);
                item.style.cursor = 'pointer';
            }
            
            this.breadcrumb.appendChild(item);
            currentPath += '/';
        });
    }

    updateStats(data) {
        this.browserStats.textContent = 
            `${data.totalItems} items • ${data.directories} folders • ${data.files} files`;
    }

    async addToQueue(url, name, size) {
        try {
            const response = await fetch('/api/queue/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, name, size })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to add to queue');
            }

            await this.refreshQueue();
            this.showToast(`Added "${name}" to queue`, 'success');
            this.renderDirectory({ items: this.getCurrentItems() });
            
        } catch (error) {
            console.error('Error adding to queue:', error);
            this.showToast(error.message, 'error');
        }
    }

    async removeFromQueue(url, name) {
        try {
            const item = this.queue.find(item => item.url === url);
            if (!item) return;

            const response = await fetch(`/api/queue/${item.id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Failed to remove from queue');

            await this.refreshQueue();
            this.showToast(`Removed "${name}" from queue`, 'success');
            this.renderDirectory({ items: this.getCurrentItems() });
            
        } catch (error) {
            console.error('Error removing from queue:', error);
            this.showToast('Failed to remove from queue', 'error');
        }
    }

    async refreshQueue() {
        try {
            const response = await fetch('/api/queue');
            if (!response.ok) throw new Error('Failed to fetch queue');
            
            const data = await response.json();
            this.queue = data.items;
            this.updateQueueDisplay(data);
            
        } catch (error) {
            console.error('Error refreshing queue:', error);
        }
    }

    updateQueueDisplay(queueData) {
        this.queueCount.textContent = queueData.count;
        this.queueItemsCount.textContent = queueData.count;
        this.queueTotalSize.textContent = queueData.totalSize;

        if (queueData.count === 0) {
            this.queueList.innerHTML = `
                <div class="empty-queue">
                    <span>Queue is empty</span>
                    <p>Click the + button next to files to add them</p>
                </div>
            `;
            return;
        }

        this.queueList.innerHTML = '';
        queueData.items.forEach(item => {
            const queueElement = this.createQueueElement(item);
            this.queueList.appendChild(queueElement);
        });
    }

    createQueueElement(item) {
        const div = document.createElement('div');
        div.className = 'queue-item';
        
        div.innerHTML = `
            <div class="queue-item-info">
                <div class="queue-item-name" title="${this.escapeHtml(item.name)}">
                    ${this.escapeHtml(this.truncateText(item.name, 30))}
                </div>
                <div class="queue-item-meta">
                    Size: ${item.size} • ${item.type}
                </div>
            </div>
            <div class="queue-item-actions">
                <button class="btn btn-xs btn-danger" 
                        onclick="app.removeFromQueueById('${item.id}')"
                        title="Remove from queue">
                    ✖️
                </button>
            </div>
        `;

        return div;
    }

    async removeFromQueueById(id) {
        try {
            const response = await fetch(`/api/queue/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Failed to remove from queue');

            await this.refreshQueue();
            this.showToast('Removed from queue', 'success');
            this.loadDirectory(this.currentPath); // Refresh current view
            
        } catch (error) {
            console.error('Error removing from queue:', error);
            this.showToast('Failed to remove from queue', 'error');
        }
    }

    async clearQueue() {
        if (this.queue.length === 0) return;
        
        if (!confirm(`Clear all ${this.queue.length} items from the queue?`)) return;

        try {
            const response = await fetch('/api/queue', {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Failed to clear queue');

            await this.refreshQueue();
            this.showToast('Queue cleared', 'success');
            this.loadDirectory(this.currentPath); // Refresh current view
            
        } catch (error) {
            console.error('Error clearing queue:', error);
            this.showToast('Failed to clear queue', 'error');
        }
    }

    async exportQueue(format) {
        if (this.queue.length === 0) {
            this.showToast('Queue is empty', 'warning');
            return;
        }

        try {
            const response = await fetch(`/api/queue/export/${format}`);
            if (!response.ok) throw new Error('Failed to export queue');

            if (format === 'json') {
                const data = await response.json();
                this.downloadFile(
                    JSON.stringify(data, null, 2), 
                    `myrient-queue-${Date.now()}.json`,
                    'application/json'
                );
            } else {
                const script = await response.text();
                this.downloadFile(
                    script,
                    `download_${format}_${Date.now()}.sh`,
                    'text/plain'
                );
            }

            this.showToast(`Exported ${this.queue.length} items as ${format}`, 'success');
            
        } catch (error) {
            console.error('Error exporting queue:', error);
            this.showToast('Failed to export queue', 'error');
        }
    }

    downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        
        URL.revokeObjectURL(url);
    }

    toggleQueue() {
        if (this.isQueueVisible) {
            this.hideQueue();
        } else {
            this.showQueue();
        }
    }

    showQueue() {
        this.queueSidebar.classList.remove('hidden');
        this.isQueueVisible = true;
    }

    hideQueue() {
        this.queueSidebar.classList.add('hidden');
        this.isQueueVisible = false;
    }

    refreshDirectory() {
        this.loadDirectory(this.currentPath);
    }

    handleSearch(query) {
        const items = Array.from(this.fileList.querySelectorAll('.file-item'));
        
        if (!query.trim()) {
            items.forEach(item => item.style.display = 'flex');
            return;
        }

        const searchTerm = query.toLowerCase();
        items.forEach(item => {
            const fileName = item.querySelector('.file-name').textContent.toLowerCase();
            item.style.display = fileName.includes(searchTerm) ? 'flex' : 'none';
        });
    }

    getCurrentItems() {
        // This would need to be populated from the last directory load
        // For now, return empty array as it's used for re-rendering
        return [];
    }

    showLoading() {
        this.loadingOverlay.classList.remove('hidden');
    }

    hideLoading() {
        this.loadingOverlay.classList.add('hidden');
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        this.toastContainer.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 4000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    escapeAttribute(text) {
        return text.replace(/'/g, '\\\'').replace(/"/g, '\\"');
    }

    truncateText(text, maxLength) {
        return text.length > maxLength ? text.substr(0, maxLength) + '...' : text;
    }

    async checkAppInfo() {
        try {
            const response = await fetch('/api/info');
            if (response.ok) {
                const info = await response.json();
                this.isDesktop = info.isDesktop;
                
                if (this.isDesktop) {
                    document.title = `${info.name} - Desktop App`;
                    // Add desktop indicator to header
                    const logo = document.querySelector('.logo');
                    if (logo) {
                        const desktopBadge = document.createElement('span');
                        desktopBadge.className = 'desktop-badge';
                        desktopBadge.textContent = '🖥️';
                        desktopBadge.title = 'Running as Desktop Application';
                        logo.appendChild(desktopBadge);
                    }
                }
            }
        } catch (error) {
            console.log('Could not fetch app info (probably running in web mode)');
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new MyrientViewer();
});

// Handle keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('search-input').focus();
    }
    
    // Escape to clear search
    if (e.key === 'Escape') {
        const searchInput = document.getElementById('search-input');
        if (searchInput === document.activeElement) {
            searchInput.value = '';
            window.app.handleSearch('');
        }
    }
});