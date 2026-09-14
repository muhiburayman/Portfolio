/* =========================================================
   MUHIBUR DIGITAL WORLD
   INTERACTION ENGINE
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const body = document.body;

const header = document.getElementById("header");

const worldSwitch =
    document.getElementById("worldSwitch");

const worldLabel =
    document.getElementById("worldLabel");

const switchIcon =
    document.querySelector(".switch-icon i");

const music =
    document.getElementById("backgroundMusic");

const musicToggle =
    document.getElementById("musicToggle");

const musicStatus =
    document.getElementById("musicStatus");

const musicConsole =
    document.getElementById("musicConsole");

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.querySelector(".nav-menu");

const themeToggle =
    document.getElementById("themeToggle");

const typingText =
    document.getElementById("typingText");


/* =========================================================
   WORLD MODE
========================================================= */

let currentMode =
    localStorage.getItem("muhiburWorldMode") || "cse";


function applyWorld(mode) {

    if (mode === "dm") {

        body.classList.remove("cse-mode");

        body.classList.add("dm-mode");

        worldLabel.textContent =
            "DIGITAL MARKETING";

        switchIcon.className =
            "fa-solid fa-chart-line";

        musicStatus.textContent =
            "DM MODE // AMBIENT";

        localStorage.setItem(
            "muhiburWorldMode",
            "dm"
        );

    } else {

        body.classList.remove("dm-mode");

        body.classList.add("cse-mode");

        worldLabel.textContent =
            "CSE MODE";

        switchIcon.className =
            "fa-solid fa-code";

        musicStatus.textContent =
            "CSE MODE // AMBIENT";

        localStorage.setItem(
            "muhiburWorldMode",
            "cse"
        );
    }
}


applyWorld(currentMode);


worldSwitch.addEventListener("click", () => {

    currentMode =
        currentMode === "cse"
            ? "dm"
            : "cse";

    /* visual transition */

    document.body.classList.add(
        "world-changing"
    );

    setTimeout(() => {

        applyWorld(currentMode);

    }, 300);

    setTimeout(() => {

        document.body.classList.remove(
            "world-changing"
        );

    }, 900);

});


/* =========================================================
   TYPING EFFECT
========================================================= */

const cseRoles = [
    "CSE Student",
    "Future Developer",
    "Python Learner",
    "Technology Explorer"
];

const dmRoles = [
    "Digital Marketing Specialist",
    "SEO Learner",
    "Social Media Marketer",
    "Creative Strategist"
];

let roleIndex = 0;

let characterIndex = 0;

let deleting = false;


function typingLoop() {

    const roles =
        body.classList.contains("dm-mode")
            ? dmRoles
            : cseRoles;

    const currentRole =
        roles[roleIndex % roles.length];


    if (!deleting) {

        typingText.textContent =
            currentRole.substring(
                0,
                characterIndex + 1
            );

        characterIndex++;

        if (
            characterIndex ===
            currentRole.length
        ) {

            deleting = true;

            setTimeout(
                typingLoop,
                1400
            );

            return;
        }

    } else {

        typingText.textContent =
            currentRole.substring(
                0,
                characterIndex - 1
            );

        characterIndex--;

        if (characterIndex === 0) {

            deleting = false;

            roleIndex++;

        }
    }


    setTimeout(
        typingLoop,
        deleting ? 45 : 75
    );
}


typingLoop();


/* =========================================================
   HEADER SCROLL
========================================================= */

window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 40) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );
        }

    }
);


/* =========================================================
   MOBILE MENU
========================================================= */

menuToggle.addEventListener(
    "click",
    () => {

        navMenu.classList.toggle(
            "open"
        );

        const icon =
            menuToggle.querySelector("i");

        if (
            navMenu.classList.contains(
                "open"
            )
        ) {

            icon.className =
                "fa-solid fa-xmark";

        } else {

            icon.className =
                "fa-solid fa-bars";
        }

    }
);


/* close mobile menu */

document
    .querySelectorAll(".nav-link")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                navMenu.classList.remove(
                    "open"
                );

                const icon =
                    menuToggle.querySelector("i");

                icon.className =
                    "fa-solid fa-bars";
            }
        );

    });


/* =========================================================
   MUSIC PLAYER
========================================================= */

let musicPlaying = false;


function updateMusicButton() {

    const icon =
        musicToggle.querySelector("i");

    const text =
        musicToggle.querySelector("span");


    if (musicPlaying) {

        icon.className =
            "fa-solid fa-pause";

        text.textContent =
            "STOP";

        musicConsole.classList.add(
            "music-playing"
        );

    } else {

        icon.className =
            "fa-solid fa-play";

        text.textContent =
            "PLAY";

        musicConsole.classList.remove(
            "music-playing"
        );
    }
}


musicToggle.addEventListener(
    "click",
    async () => {

        try {

            if (!musicPlaying) {

                await music.play();

                musicPlaying = true;

            } else {

                music.pause();

                musicPlaying = false;
            }

            updateMusicButton();

        } catch (error) {

            console.log(
                "Audio could not start:",
                error
            );
        }

    }
);


/* =========================================================
   THEME TOGGLE
========================================================= */

themeToggle.addEventListener(
    "click",
    () => {

        body.classList.toggle(
            "light-mode"
        );

        const icon =
            themeToggle.querySelector("i");

        if (
            body.classList.contains(
                "light-mode"
            )
        ) {

            icon.className =
                "fa-solid fa-sun";

        } else {

            icon.className =
                "fa-solid fa-moon";
        }

    }
);


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    navLinks.forEach(
                        link =>
                            link.classList.remove(
                                "active"
                            )
                    );

                    const activeLink =
                        document.querySelector(
                            `.nav-link[href="#${entry.target.id}"]`
                        );

                    if (activeLink) {

                        activeLink.classList.add(
                            "active"
                        );
                    }

                }

            });

        },
        {
            threshold: .35
        }
    );


sections.forEach(section =>
    observer.observe(section)
);


/* =========================================================
   PARALLAX WORLD
========================================================= */

const heroWorld =
    document.querySelector(
        ".hero-world"
    );

if (heroWorld) {

    document.addEventListener(
        "mousemove",
        event => {

            const x =
                (window.innerWidth / 2 -
                event.clientX) / 60;

            const y =
                (window.innerHeight / 2 -
                event.clientY) / 60;


            heroWorld.style.transform =
                `translate(${x}px, ${y}px)`;

        }
    );

}


/* =========================================================
   REDUCED MOTION ACCESSIBILITY
========================================================= */

const reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


if (reducedMotion.matches) {

    document.documentElement.style
        .scrollBehavior = "auto";
}


/* =========================================================
   INITIAL MUSIC STATE
========================================================= */

updateMusicButton();


/* =========================================================
   WORLD KEYBOARD SHORTCUT
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        /* Press M to switch worlds */

        if (
            event.key.toLowerCase() === "m" &&
            event.target.tagName !== "INPUT" &&
            event.target.tagName !== "TEXTAREA"
        ) {

            worldSwitch.click();

        }

        /* Press Space to play/pause */

        if (
            event.code === "Space" &&
            event.target.tagName !== "INPUT" &&
            event.target.tagName !== "TEXTAREA"
        ) {

            event.preventDefault();

            musicToggle.click();

        }

    }
);
