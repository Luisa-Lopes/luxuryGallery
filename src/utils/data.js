import fetchData from "./fetchApi";

const Data = async () => {

    const results = await fetchData();

    results.Architecture = FilterData(results.Architecture);
    results.Collections = FilterData(results.Collections);
    results.Film = FilterData(results.Film);
    results.Nature = FilterData(results.Nature);
    results.Photos = FilterData(results.Photos)
    results.People = FilterData(results.People);
    results.StreetPhotography = FilterData(results.StreetPhotography);
    results.Topics = FilterData(results.Topics);
    results.Wallpapers = FilterData(results.Wallpapers);

    return results;
}

const FilterData = (datas) => {

    let array = []

    datas.forEach(element => {

        var favorite = false
        var storage = JSON.parse(localStorage.getItem("favorites")) || []

        const index = storage.findIndex(item => item.id === element.id)

        if (index !== -1) favorite = true

        array.push(FilterItem(element,favorite))

    })

    return array

}

const FilterItem = (element, favorite) => {
    const item = {
        alt: element ? (element.alt_description ? element.description : (element.cover_photo?.alt_description || null)) : null,
        favorite: favorite,
        height: element.height || element.cover_photo.height,
        id: element.id,
        likes: element.likes
            ? element.likes
            : (element.cover_photo?.likes || 0),
        urls: element.urls || element.cover_photo.urls,
        user: {
            bio: element.user?.bio
                ? element.user.bio
                : (element.owners?.[0]?.bio || null),
            first_name: element.user?.first_name || element.owners[0].first_name,
            id: element.user?.id || element.owners[0].id,
            instagram_username: element.user?.instagram_username
                ? element.user.instagram_username
                : element.owners?.[0]?.instagram_username || element.cover_photo?.user?.instagram_username || null,
            name: element.user?.name || element.owners[0].name,
            profile_image: element.user?.profile_image || element.owners[0].profile_image,
            username: element.user?.username || element.owners[0].username
        },
        width: element.width || element.cover_photo.width
    }

    return item
}

export default Data;
export { FilterData , FilterItem};