$.ajax({
  headers: {
    'X-Auth-Token': 'd28e0b7eded44a538b63e9228cdab231'
  },
  url: 'http://api.football-data.org/v2/',
  dataType: 'json',
  type: 'GET',
}).done(function (response) {

  function status(response) {
    if (response.status !== 200) {
      console.log("Error : " + response.status);
      // Method reject() akan membuat blok catch terpanggil
      return Promise.reject(new Error(response.statusText));
    } else {
      // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
      return Promise.resolve(response);
    }

  }
  // Blok kode untuk memparsing json menjadi array JavaScript
  function json(response) {
    return response.json();
  }

  // Blok kode untuk meng-handle kesalahan di blok catch
  function error(error) {
    // Parameter error berasal dari Promise.reject()
    console.log("Error : " + error);
  }


  // Blok kode untuk melakukan request data json

  function getCompetitions() {
    if ('caches' in window) {
      caches.match(url + "competitions").then(function (response) {
        if (response) {
          response.json().then(function (data) {
            var competitionsHTML = "";
            data.result.forEach(function (competitions) {
              competitionsHTML += `
                    <div class="card">
                      <a href="./competitions.html?id=${competitions.id}">
                        <div class="card-image waves-effect waves-block waves-light">
                          <img src="${competitions.emblemUrl}" />
                        </div>
                      </a>
                      <div class="card-co ntent">
                        <span class="card-title truncate">${competitions.name}</span>
                      </div>
                    </div>
                  `;
            });
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("competitions").innerHTML = competitionsHTML;
          })
        }
      })
    }

    fetch(base_url + "competitions")
      .then(status)
      .then(json)
      .then(function (data) {
        // Objek/array JavaScript dari response.json() masuk lewat data.
        // Menyusun komponen card artikel secara dinamis
        var competitionsHTML = "";
        data.result.forEach(function (competitions) {
          competitionsHTML += `
                <div class="card">
                  <a href="./competitions.html?id=${competitions.id}">
                    <div class="card-image waves-effect waves-block waves-light">
                      <img src="${competitions.emblemUrl}" />
                    </div>
                  </a>
                  <div class="card-content">
                    <span class="card-title truncate">${competitions.name}</span>
                  </div>
                </div>
              `;
        });
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("competitions").innerHTML = competitionsHTML;
      })
      .catch(error);
  }

});

// var base_url = "https://api.football-data.org/v2/";
// Blok kode yang akan di panggil jika fetch berhasil





// function getArticleById() {
//   return new Promise(funtion(resolve, reject) {
//     var urlParams = new URLSearchParams(window.location.search);
//     var idParam = urlParams.get("ID");

//     if ('caches' in window) {
//       caches.match(base_url + "articles/" + idParam).then(function (response) {
//         if (response) {
//           response.json().then(function (data) {
//             var articlesHTML = "";
//             data.result.forEach(function (article) {
//               articlesHTML += `
//                     <div class="card">
//                       <a href="./article.html?id=${article.id}">
//                         <div class="card-image waves-effect waves-block waves-light">
//                           <img src="${article.thumbnail}" />
//                         </div>
//                       </a>
//                       <div class="card-content">
//                         <span class="card-title truncate">${article.title}</span>
//                         <p>${article.description}</p>
//                       </div>
//                     </div>
//                   `;
//             });
//             // Sisipkan komponen card ke dalam elemen dengan id #content
//             document.getElementById("articles").innerHTML = articlesHTML;
//             resolve(data);
//           });
//         }
//       });
//     }

//     // Ambil nilai query parameter (?id=)
//     // var urlParams = new URLSearchParams(window.location.search);
//     // var idParam = urlParams.get("id");
//     fetch(base_url + "article/" + idParam)
//       .then(status)
//       .then(json)
//       .then(function (data) {
//         // Objek JavaScript dari response.json() masuk lewat variabel data.
//         console.log(data);
//         // Menyusun komponen card artikel secara dinamis
//         var articleHTML = `
//           <div class="card">
//             <div class="card-image waves-effect waves-block waves-light">
//               <img src="${data.result.cover}" />
//             </div>
//             <div class="card-content">
//               <span class="card-title">${data.result.post_title}</span>
//               ${snarkdown(data.result.post_content)}
//             </div>
//           </div>
//         `;
//         // Sisipkan komponen card ke dalam elemen dengan id #content
//         document.getElementById("body-content").innerHTML = articleHTML;
//         resolve(data);
//       });
//   });
// }