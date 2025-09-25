document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('[data-tvid]').forEach(function(item) {
    const tvId = item.getAttribute('data-tvid');
    const isSidebar = item.classList.contains('sidebar-popular-item');
    let nextEpDiv = isSidebar
      ? item.querySelector('.js-next-episode')
      : item.classList.contains('tv-next-episode')
        ? item
        : item.querySelector('.tv-next-episode');
    if (!tvId || !nextEpDiv) return;

    fetch(`https://api.themoviedb.org/3/tv/${tvId}?api_key=a983e323a65de43117276d9d9d70c116&append_to_response=next_episode_to_air`)
      .then(res => res.json())
      .then(data => {
        if (data.next_episode_to_air) {
          const ep = data.next_episode_to_air;
          if (isSidebar) {
            nextEpDiv.textContent = `SS ${ep.season_number} / EP ${ep.episode_number} / ${ep.air_date}`;
          } else {
            nextEpDiv.innerHTML = `
              <span class="badge bg-primary" style="padding-bottom: 2px;">SS ${ep.season_number}</span>
              <span class="badge bg-success" style="padding-bottom: 2px;">Ep ${ep.episode_number}</span>
            `;
          }
        } else if (data.status) {
          if (isSidebar) {
            nextEpDiv.textContent = data.status;
          } else {
            nextEpDiv.innerHTML = `<span class="badge bg-secondary badge-home-rating" style="padding-bottom: 2px;">${data.status}</span>`;
          }
        } else {
          nextEpDiv.textContent = 'No episodes available';
        }
      })
      .catch(() => {
        nextEpDiv.textContent = 'Failed to load data';
      });
  });
});
