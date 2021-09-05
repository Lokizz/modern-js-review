// * Iterator Mini Project
const data = [
  {
    name: "John Doe",
    age: 32,
    gender: 'male',
    lookingfor: 'female',
    location: 'Boston MA',
    image: 'https://randomuser.me/api/portraits/men/82.jpg'
  },
  {
    name: "Jean Doe",
    age: 22,
    gender: 'female',
    lookingfor: 'male',
    location: 'Miami FL',
    image: 'https://randomuser.me/api/portraits/women/82.jpg'
  },
  {
    name: "William Hen",
    age: 42,
    gender: 'male',
    lookingfor: 'female',
    location: 'Lynn MA',
    image: 'https://randomuser.me/api/portraits/men/83.jpg'
  }
]

const profiles = profileIterator(data)

// Call first profile
nextProfile()

// ? Next event
document.getElementById('next').addEventListener('click', nextProfile)

// ? Next profile display
function nextProfile() {
  const currentProfile = profiles.next().value

  if (currentProfile !== undefined) {
    // render profileDisplay div
    document.getElementById('profileDisplay').innerHTML = `
      <ul class="list-group">
        <li class="list-group-item">Name: ${currentProfile.name}</li>
        <li class="list-group-item">Age: ${currentProfile.age}</li>
        <li class="list-group-item">Gender: ${currentProfile.gender}</li>
        <li class="list-group-item">Lookingfor: ${currentProfile.lookingfor}</li>
        <li class="list-group-item">Location: ${currentProfile.location}</li>
      </ul>
    `
    document.getElementById('imageDisplay').innerHTML = `
      <img src="${currentProfile.image}">
    `
  } else {
    // No more profiles
    window.location.reload()
  }
}

// ? Profile Iterator
function profileIterator(profiles) {
  let profileIdx = 0

  return {
    next() {
      return profileIdx < profiles.length ? 
      { value: profiles[profileIdx++], done: false } :
      { done: true }
    }
  }
}