let allMediaItems = [];

function renderGallery(items) 
{
    const gallery = document.getElementById('gallery-content');
    gallery.innerHTML = ''; // Clear previous

    items.forEach(item => 
    {
        const wrapper = document.createElement('div');
        wrapper.classList.add('gallery-card');

        const img = document.createElement('img');
        img.src = `/static/uploads/${item.filename}`;
        img.alt = item.tags;
        img.classList.add('gallery-media');

        const caption = document.createElement('p');
        caption.className = 'gallery-caption';
        caption.innerText = `Tags: ${item.tags}`;

        wrapper.appendChild(img);
        wrapper.appendChild(caption);
        gallery.appendChild(wrapper);
    });
}

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

            renderGallery(filtered);
        });
    }

    // Export so other scripts can trigger re-renders
    window.renderGallery = renderGallery;
    window.setGalleryItems = function (items) 
    {
        allMediaItems = items;
        renderGallery(items);
    };
});
