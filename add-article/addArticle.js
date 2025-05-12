window.onload = (event) => {
  document.getElementById("add-article-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    //Save new article in backend.
    const form = event.target;
    const data = {
      name: form.name.value,
      email: form.email.value,
      title: form.title.value,
      imgUrl: form.imgUrl.value,
      contents: form.contents.value,
    };

    try {
      const response = await fetch("http://localhost:8080/api/v1/article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed: ${response.status} - ${errorText}`);
      }
      window.location.replace("/index.html");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again.");
    }
  });
  
}