document.getElementById('uploadForm').addEventListener('submit', async function (e) 
{
    e.preventDefault();
    
    const form = new FormData(this);
    const response = await fetch('/api/upload', 
    {
        method: 'POST',
        body: form
    });

    const result = await response.json();
    document.getElementById('upload-status').innerText = result.message;

    if (result.success) 
    {
        loadGallery(); // Refresh right side
        this.reset();
    }
});