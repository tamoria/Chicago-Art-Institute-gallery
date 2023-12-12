  document.addEventListener('DOMContentLoaded', () => {
    const imagePaths = [
      {name: 'A Marine 1874-75 George Inness.jpg', image_id: '68792'},
      {name: 'After a Summer Shower 1894 George Inness.jpg', image_id: '64715'},
      {name: 'Bordighera 1884 Claude Monet.jpg', image_id: '81537'},
      {name: 'Daniel-Henry Kahnweiler, autumn 1910 Pablo Picasso.jpg', image_id: '111060'},
      {name: 'Mountain Brook 1863 Albert Bierstadt.jpg', image_id: '146701'},
      {name: 'Panorama from the Sasso 1649-1655 Claude Lorrain.jpg', image_id: '60031'},
      {name: 'Rocks at Port-Goulphar Bellelle 1886 Claude Monet.jpg', image_id: '20545'},
      {name: 'Twilight Hale Woodruff 1900 to 1980.jpg', image_id: '122230', classList: 'lastFourImg'},
      {name: 'Spring Rains William Victor Higgins 1884 to 1949.jpg', image_id: '11371', classList: 'lastFourImg'},
      {name: 'Ice Gerhard Richter 1989.jpg', image_id: '146994', classList: 'lastFourImg'},
    ];


    async function fetchPaintingsInfo(index, imageData) {
      const apiUrl = `https://api.artic.edu/api/v1/artworks/${imageData.image_id}?fields=id,title,image_id,artist_display`;
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log('API Response:', data); 
        return { index, data };
      } catch (error) {
        console.error('Error fetching painting info:', error);
        return { index, data: {} };
      }
    }
  
    const displayArtworks = async () => {
      const imagesContainer = document.getElementById('images-container');
    
      for (let i = 0; i < imagePaths.length; i++) {
        const imageData = imagePaths[i];
    
        const artworkDiv = document.createElement('div');
        artworkDiv.className = 'artwork';
    
        // Add class to the last four images
        if (i >= imagePaths.length - 4) {
          artworkDiv.classList.add('lastFourImg');
        }
    
        const img = document.createElement('img');
        img.src = `images/${imageData.name}`;
        img.alt = `Artwork ${i + 1}`;
    
        img.addEventListener('click', async () => {
          const { index, data: paintingsInfo } = await fetchPaintingsInfo(i, imageData);
          alert(`
            Index: ${index + 1}
            Title: ${paintingsInfo.data.title}
            ID: ${paintingsInfo.data.id}
            Artist Information: ${paintingsInfo.data.artist_display}
          `);
        });
    
        artworkDiv.appendChild(img);
        imagesContainer.appendChild(artworkDiv);
      }
    };
    
    displayArtworks();
    
  });