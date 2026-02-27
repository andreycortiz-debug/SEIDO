// loader.js

/**
 * Simple JavaScript Loader
 * Dynamically loads scripts and ensures they are loaded in order if necessary.
 */
class Loader {
    constructor() {
        this.loadedScripts = new Set();
    }

    loadScript(src) {
        return new Promise((resolve, reject) => {
            if (this.loadedScripts.has(src)) {
                // Script is already loaded
                resolve();
                return;
            }
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => {
                this.loadedScripts.add(src);
                resolve();
            };
            script.onerror = () => reject(new Error(`Error loading script: ${src}`));
            document.head.appendChild(script);
        });
    }

    async loadScripts(scripts) {
        for (const script of scripts) {
            await this.loadScript(script);
        }
    }
}

// Example usage:
const loader = new Loader();
loader.loadScripts([
    'script1.js',
    'script2.js',
    'script3.js'
]).then(() => {
    console.log('All scripts loaded successfully');
}).catch(error => {
    console.error(error);
});
