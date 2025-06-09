document.addEventListener('DOMContentLoaded', () => 
{
    const searchInput = document.getElementById('tagSearchInput');

    if (searchInput) 
    {
        searchInput.addEventListener('input', () => 
        {
            const keyword = searchInput.value.trim().toLowerCase();

            const filtered = allMediaItems.filter(item =>
                item.tags.toLowerCase().includes(keyword)
            );

            loadGallery(filtered); // re-render using filtered data
        });
    }

    // Initial load of full gallery
    loadGallery();
});
