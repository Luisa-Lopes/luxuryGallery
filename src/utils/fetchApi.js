
const API_KEY = process.env.REACT_APP_PUBLIC_API_KEY

const requests = {
    fetchTopics: `https://api.unsplash.com/topics/?client_id=${API_KEY}`,
    fetchPhotos: `https://api.unsplash.com/photos/?client_id=${API_KEY}&page=2&per_page=21`,
    fetchWallpapers: `https://api.unsplash.com/topics/wallpapers/photos/?client_id=${API_KEY}`,
    fetchCollections: `https://api.unsplash.com/collections/?client_id=${API_KEY}&page=2&per_page=20`,
    fetchNature: `https://api.unsplash.com/topics/nature/photos/?client_id=${API_KEY}`,
    fetchPeople: `https://api.unsplash.com/topics/people/photos/?client_id=${API_KEY}`,
    fetchArchitecture: `https://api.unsplash.com/topics/architecture-interior/photos/?client_id=${API_KEY}`,
    fetchFilm: `https://api.unsplash.com/topics/film/photos/?client_id=${API_KEY}`,
    fetchStreetPhotography: `https://api.unsplash.com/topics/street-photography/photos/?client_id=${API_KEY}`
}

const fetchData = async () => {
    const [
        Topics,
        Photos,
        Wallpapers,
        Collections, 
        Nature,
        People,
        Architecture,
        Film,
        StreetPhotography
    ] = await Promise.all(
        [
            fetch(requests.fetchTopics, { timeout: 10000 }).then((res) => res.json()),
            fetch(requests.fetchPhotos, { timeout: 10000 }).then((res) => res.json()),
            fetch(requests.fetchWallpapers, { timeout: 10000 }).then((res) => res.json()),
            fetch(requests.fetchCollections, { timeout: 10000 }).then((res) => res.json()),
            fetch(requests.fetchNature, { timeout: 10000 }).then((res) => res.json()),
            fetch(requests.fetchPeople, { timeout: 10000 }).then((res) => res.json()),
            fetch(requests.fetchArchitecture, { timeout: 10000 }).then((res) => res.json()),
            fetch(requests.fetchFilm, { timeout: 10000 }).then((res) => res.json()),
            fetch(requests.fetchStreetPhotography, { timeout: 10000 }).then((res) => res.json()),

        ]
    )

        return{
            Topics: Topics,
            Photos: Photos,
            Wallpapers: Wallpapers,
            Collections: Collections,
            Nature: Nature,
            People: People,
            Architecture: Architecture,
            Film: Film,
            StreetPhotography: StreetPhotography
        }

}


export default fetchData; 
