 $(document).ready(function() {
            var apiKey = "a79576e54c5bbb893011b98ca48f2460";

            // Fetch trending data from TMDb API
            $.getJSON("https://api.themoviedb.org/3/trending/all/week?language=en-US&api_key=" + apiKey, function(response) {
                var trendingData = response.results;
                initializeProofs(trendingData);
            });

            function initializeProofs(trendingData) {
                function showProof(counter) {
                    setTimeout(function() {
                        // Hapus elemen dengan kelas proof
                        $(".proof").remove();

                        // Jika counter masih kurang dari atau sama dengan 10, lakukan hal berikut
                        if (counter <= 10) {
                            // Acak array movies
                            var shuffledMovies = shuffleArray(trendingData);
                            var movieMT = shuffledMovies[0].title || shuffledMovies[0].name;

                            // Ambil data dari API Random User
                            $.getJSON("https://randomuser.me/api/", function(data) {
                                var user = data.results[0];
                                var firstName = user.name.first;
                                var avatar = user.picture.medium;
                                var country = user.location.country;

                                // Buat elemen proof baru dan tambahkan ke body
                                var proofElement = $(`
                                    <div class="proof">
                                        <div class="ripple">
                                            <div class="proof-avatar">
                                                <img src="${avatar}">
                                            </div>
                                            <div class="proof-data">
                                                <h4><span class="userName">${firstName}</span> <span class="fromN">from</span> ${country}</h4>
                                                <small>Now Watching "<span class="titleWatch">${movieMT}"</span></small>
                                                <p>Recently <span class="signUpB">signed up</span></p>
                                            </div>
                                        </div>
                                    </div>
                                `);
                                $("body").append(proofElement);

                                // Panggil kembali fungsi showProof dengan peningkatan counter
                                showProof(counter + 1);
                            });
                        }
                    }, 5000); // Tunggu selama 5 detik sebelum memanggil fungsi lagi
                }

                // Tunda 2 detik sebelum memanggil fungsi pertama kali
                setTimeout(function() {
                    showProof(1);
                }, 2000);

                // Fungsi untuk mengacak array (misalnya, untuk movies)
                function shuffleArray(array) {
                    for (var i = array.length - 1; i > 0; i--) {
                        var j = Math.floor(Math.random() * (i + 1));
                        var temp = array[i];
                        array[i] = array[j];
                        array[j] = temp;
                    }
                    return array;
                }
            }
        });
