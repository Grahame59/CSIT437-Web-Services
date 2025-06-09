async function loadGallery() 
{
    const res = await fetch('/api/gallery');
    const data = await res.json();

    const gallery = document.getElementById('gallery-content');
    gallery.innerHTML = ''; // Clear previous

    // Store gallery data globally for filtering
    setGalleryItems(data);

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

        // Toggle to input
        tagContainer.onclick = () => 
        {
            tagContainer.style.display = 'none';
            tagInput.style.display = 'inline-block';
            saveBtn.style.display = 'inline-block';
        };

        // Save tag updates
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

        //Download Btn
        const downloadLink = document.createElement('a');
        downloadLink.href = `/static/uploads/${item.filename}`;
        downloadLink.download = item.filename;
        downloadLink.innerText = 'Download';
        downloadLink.classList.add('gallery-download');

        // Delete button
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
                loadGallery();
            else 
                alert('Failed to delete file.');
        };

        // Add all elements to wrapper
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

window.onload = loadGallery;

