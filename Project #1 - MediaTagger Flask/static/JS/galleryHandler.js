let allMediaItems = [];
function setGalleryItems(items) 
{
    allMediaItems = items;
}
async function loadGallery(filteredData = null) 
{
    const gallery = document.getElementById('gallery-content');
    gallery.innerHTML = ''; // Clear previous

    // uses passed filtered data or fetched from server
    const data = filteredData || await (await fetch('/api/gallery')).json();

    if (!filteredData) setGalleryItems(data); // Only set on full load

    data.forEach(item => 
    {
        const wrapper = document.createElement('div');
        wrapper.classList.add('gallery-card');

        // Media Preview
        const img = document.createElement('img');
        img.src = `/static/uploads/${item.filename}`;
        img.alt = item.tags;
        img.classList.add('gallery-media');

        // --- TAG DISPLAY + EDIT ---
        const tagContainer = document.createElement('div');
        tagContainer.classList.add('gallery-caption');
        tagContainer.innerText = `Tags: ${item.tags}`;
        tagContainer.style.cursor = 'pointer';

        const tagInput = document.createElement('input');
        tagInput.type = 'text';
        tagInput.value = item.tags;
        tagInput.style.display = 'none';
        tagInput.classList.add('gallery-caption');

        const saveBtn = document.createElement('button');
        saveBtn.innerText = 'Save';
        saveBtn.classList.add('gallery-download');
        saveBtn.style.display = 'none';

        tagContainer.onclick = () => 
        {
            tagContainer.style.display = 'none';
            tagInput.style.display = 'inline-block';
            saveBtn.style.display = 'inline-block';
        };

        saveBtn.onclick = async () => 
        {
            const newTags = tagInput.value;

            const res = await fetch('/api/update-tags', 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ filename: item.filename, tags: newTags })
            });

            const result = await res.json();
            if (result.success) 
            {
                tagContainer.innerText = `Tags: ${newTags}`;
                tagInput.style.display = 'none';
                saveBtn.style.display = 'none';
                tagContainer.style.display = 'block';
            } else 
            {
                alert('Failed to update tags.');
            }
        };

        // Download Button
        const downloadLink = document.createElement('a');
        downloadLink.href = `/static/uploads/${item.filename}`;
        downloadLink.download = item.filename;
        downloadLink.innerText = 'Download';
        downloadLink.classList.add('gallery-download');

        // Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = '🗑️ Delete';
        deleteBtn.classList.add('gallery-delete');

        deleteBtn.onclick = async () => 
        {
            const confirmDelete = confirm(`Delete "${item.filename}"?`);
            if (!confirmDelete) return;

            const res = await fetch('/api/delete', 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ filename: item.filename })
            });

            const result = await res.json();
            if (result.success) 
            {
                loadGallery(); // Reload gallery after delete
            } else 
            {
                alert('Failed to delete file.');
            }
        };

        // Assemble elements
        wrapper.appendChild(img);
        wrapper.appendChild(tagContainer);
        wrapper.appendChild(tagInput);
        wrapper.appendChild(saveBtn);
        wrapper.appendChild(downloadLink);
        wrapper.appendChild(document.createElement('br'));
        wrapper.appendChild(deleteBtn);
        gallery.appendChild(wrapper);
    });
}

// Export for global access
window.setGalleryItems = setGalleryItems;
window.loadGallery = loadGallery;