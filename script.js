document.getElementById('github-form').addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const username = document.getElementById('username').value;
  const userData = await fetchUserData(username);
  
  if(userData) {
    populateUserCard(userData);
    document.getElementById('user-card').classList.remove('hidden');
  } else {
   alert('User not found!');
  }
});

async function fetchUserData(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if(response.ok) {
      return await response.json();
    }
  } catch(error) {
    console.error('Error fetching data:', error);
  }
  return null;
}

function populateUserCard(userData) {
  document.getElementById('avatar').style.backgroundImage = `url(${userData.avatar_url})`;
  document.getElementById('username-info').textContent = userData.login;
  document.getElementById('name-info').textContent = userData.name || 'N/A';
  document.getElementById('repos-info').textContent = userData.public_repos;
  document.getElementById('gists-info').textContent = userData.public_gists;
  document.getElementById('created-info').textContent = new Date(userData.created_at).toISOString().split('T')[0];
 
}



