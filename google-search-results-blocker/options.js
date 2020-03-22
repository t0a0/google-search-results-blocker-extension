document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);

// Saves options to chrome.storage
function save_options() {
    var matches = document.getElementById('block_sites_textarea').value.split("\n").filter(string => !string.isEmpty());
    chrome.storage.sync.set({
        matches: matches
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
    restore_options();
}

// Restore options from chrome.storage
function restore_options() {
    chrome.storage.sync.get({
        matches: ["quora.com"],
    }, function(storage_options) {
        document.getElementById('block_sites_textarea').value = storage_options.matches.join('\n');
    });
}

String.prototype.isEmpty = function() {
    return (this.length === 0 || !this.trim());
};
