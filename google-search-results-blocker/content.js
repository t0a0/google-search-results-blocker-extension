chrome.storage.sync.get({
    matches: ["quora.com"],
}, function(storage_options) {
    deleteSearchResultsContainers(storage_options.matches);
});

function deleteSearchResultsContainers(matching_urls) {
    // in case the content script was injected after the page is partially loaded
    doDelete();

    var mo = new MutationObserver(doDelete);
    mo.observe(document, {
        subtree: true,
        childList: true
    });
    document.addEventListener('DOMContentLoaded', function() {
        mo.disconnect()
    });

    function doDelete() {
        for (const match of matching_urls) {
            const links = document.querySelectorAll("a[href*='" + match + "']" + "[ping]")
            for (const link of links) {
                if (link.parentNode.className === "r") {
                    link.parentNode.parentNode.parentNode.remove();
                }
            }
        }
    }
}
