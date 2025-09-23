document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.sidebar-popular-item[data-tvid]').forEach(function(item) {
    const tvId = item.getAttribute('data-tvid');
    const nextEpDiv = item.querySelector('.js-next-episode');
    if (!tvId || !nextEpDiv) return;

    fetch(`https://api.themoviedb.org/3/tv/${tvId}?api_key=a983e323a65de43117276d9d9d70c116&append_to_response=next_episode_to_air`)
      .then(res => res.json())
      .then(data => {
        console.log('TMDb data:', data);
        if (data.next_episode_to_air) {
          const ep = data.next_episode_to_air;
          nextEpDiv.textContent = `Season ${ep.season_number}, Episode ${ep.episode_number} (${ep.air_date})`;
        } else if (data.status) {
          nextEpDiv.textContent = `Status: ${data.status}`;
        } else {
          nextEpDiv.textContent = 'Belum ada episode berikutnya';
        }
      })
      .catch(() => {
        nextEpDiv.textContent = 'Gagal memuat data';
      });
  });
});
