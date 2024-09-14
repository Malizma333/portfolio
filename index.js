const module = (function() {
  let currentCard = undefined;

  const projectsArray = [
    {
      titleText: "Line Rider Web",
      description: "[Line Rider Web](https://www.linerider.com) is a revision of the 2006 flash game Line Rider built for the web. I contributed highly-requested features and bugfixes.",
      thumbSrc: "assets/lrweb-thumb.png",
      thumbAlt: "Thumbnail for the official Line Rider website.",
      devIcons: [["devicon-react-original", "React"], ["devicon-materialui-plain", "MaterialUI"], ["devicon-bash-plain","Bash"]]
    },
    {
      titleText: "Line Rider Desktop",
      description: "Line Rider Desktop is another revision of Line Rider built as a Windows desktop app. I've assisted with cross-compatibility issues and feature requests. The public repository can be found [here](https://github.com/LunaKampling/LROverhaul).",
      thumbSrc: "assets/lra-thumb.png",
      thumbAlt: "Banner for the desktop edition of Line Rider.",
      devIcons: [["devicon-csharp-plain", "C#"]]
    },
    {
      titleText: "Line Rider Web Guide",
      description: "The [Line Rider web guide](https://malizma333.github.io/line-rider-web-guide) is a collection of articles and tutorials oriented towards heavier users of Line Rider web.",
      thumbSrc: "assets/lrdocs-thumb.png",
      thumbAlt: "Screenshot of the Line Rider web guide.",
      devIcons: [["devicon-markdown-original", "Markdown"], ["devicon-jekyll-plain", "Jekyll"]]
    },
    {
      titleText: "Userscript Mods",
      description: "Line Rider Web offers mod support through userscripts that inject JavaScript into the site. Userscript-based mods I've developed can be found at [this repository](https://github.com/Malizma333/linerider-userscript-mods).",
      thumbSrc: "assets/userscript-thumb.png",
      thumbAlt: "Screenshot of the Tampermonkey dashboard, showcasing a list of Line Rider related userscripts.",
      devIcons: [["devicon-javascript-plain", "JavaScript"]]
    },
    {
      titleText: "Kakuro Solver Webapp",
      description: "Kakuro is a pen-and-paper game that's best described as a hybrid of crosswords and sudoku. I made a simple puzzle solver to practice recursive backtracking and try out the NextJS framework. [Here](https://kakuro-solver.vercel.app) is the website, hosted by Vercel.",
      thumbSrc: "assets/kakuro-thumb.png",
      thumbAlt: "Partial screenshot of a solved kakuro board.",
      devIcons: [["devicon-nextjs-plain", "NextJS"], ["devicon-tailwindcss-original", "TailwindCSS"]]
    },
    {
      titleText: "Quantum Tic-Tac-Toe",
      description: "Quantum Tic-Tac-Toe is like classical Tic-Tac-Toe, but you can play two move states that get entangled. This was made as a final project for the Qubit x Qubit quantum computing course. The web-ported version is being hosted [here](https://malizma.itch.io/quantum-tic-tac-toe) on itch.io.",
      thumbSrc: "assets/quantum-thumb.png",
      thumbAlt: "Screenshot of a quantum tic-tac-toe board.",
      devIcons: [["devicon-unity-plain", "Unity"]]
    },
  ];

  function generateProjectCard({
    thumbAlt,
    thumbSrc,
    titleText,
    description,
    devIcons
  }) {
    const icons = devIcons.map(icon => `<i class="${icon[0]}" title="${icon[1]}"></i>`).join(' ');
    const newDescription = description.replace(/[\[](.+?)[\]][\(](.+?)[\)]/, "<a href=\"$2\">$1</a>");
    return `
    <div class="project-container">
      <img alt="${thumbAlt}" src="${thumbSrc}"/>
      <button class="h-text project-thumb">${titleText}</button>
      <div class="project-content">
        <button class="p-text project-content-close">
          <i class="h-text fa fa-solid fa-xmark"></i>
        </button>
        <p class="h-text">
          ${titleText}
        </p>
        <span class="h-text">${icons}</span>
        <p class="p-text description">${newDescription}</p>
      </div>
    </div>`;
  }

  async function copyContact(event, contactRef, text) {
    event.preventDefault();
    const copyIcon = contactRef.getElementsByClassName("fa-copy")[0];

    var blob = new Blob([text], { type: "text/plain" });
    var item = new ClipboardItem({ "text/plain": blob });

    await navigator.clipboard.write([item]);

    copyIcon.classList.add("fa-check");
    contactRef.style.pointerEvents = "none";
    contactRef.style.cursor = "default";

    await new Promise(_ => setTimeout(_, 500));

    copyIcon.classList.remove("fa-check");
    contactRef.style.pointerEvents = "all";
    contactRef.style.cursor = "pointer";
  }

  function showCard(event, nextCard) {
    event.preventDefault();

    if(currentCard !== undefined) {
      currentCard.style.margin = "-100% 0%";
    }

    currentCard = nextCard;

    if(nextCard !== undefined) {
      currentCard.style.margin = "0% 0%";
    }
  }

  window.onload = function() {
    const emailContactLink = document.getElementById("contacts-email");
    const discordContactLink = document.getElementById("contacts-discord");
    
    emailContactLink.addEventListener(
      "click", async (e) => copyContact(e, emailContactLink, "tkbessler@gmail.com"), false
    );

    discordContactLink.addEventListener(
      "click", async (e) => copyContact(e, discordContactLink, "malizma"), false
    );

    const projectDiv = document.getElementById("projects");

    for(const projectData of projectsArray) {
      projectDiv.innerHTML += generateProjectCard(projectData);
    }

    const projectCells = document.getElementsByClassName("project-container");

    for(const project of projectCells) {
      const card = project.getElementsByClassName("project-content")[0];
      const openButton = project.getElementsByClassName("project-thumb")[0];
      const closeButton = project.getElementsByClassName("project-content-close")[0];
      openButton.addEventListener("click", (e) => showCard(e, card), false);
      closeButton.addEventListener("click", (e) => showCard(e, undefined), false);
    }
  }

  return undefined;
})();