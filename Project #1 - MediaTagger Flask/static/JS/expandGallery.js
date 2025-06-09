document.addEventListener('DOMContentLoaded', () => 
{
    const expandBtn = document.getElementById('expandGalleryBtn');
    const galleryPane = document.getElementById('gallery-pane');

    expandBtn.onclick = () => 
    {
        galleryPane.classList.toggle('fullscreen-gallery');
        expandBtn.innerText = galleryPane.classList.contains('fullscreen-gallery') ? 'X' : '⛶';
    };
});
