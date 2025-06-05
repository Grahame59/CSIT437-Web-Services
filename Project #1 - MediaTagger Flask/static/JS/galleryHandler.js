async function loadGallery() 
{
    const res = await fetch('/api/gallery');
    const data = await res.json();

    const gallery = document.getElementById('gallery-content');
    gallery.innerHTML = ''; // Clear previous

    data.forEach(item => 
    {
        const wrapper = document.createElement('div');
        wrapper.style.marginBottom = '20px';

        const img = document.createElement('img');
        img.src = `/static/uploads/${item.filename}`;
        img.alt = item.tags;
        img.style.maxWidth = '100%';
        img.style.borderRadius = '6px';

        const caption = document.createElement('p');
        caption.innerText = `Tags: ${item.tags}`;
        caption.style.color = '#6a1b9a';
        caption.style.fontWeight = 'bold';

        wrapper.appendChild(img);
        wrapper.appendChild(caption);
        gallery.appendChild(wrapper);
    });
}

window.onload = loadGallery;
