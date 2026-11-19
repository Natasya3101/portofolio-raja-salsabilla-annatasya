
document.addEventListener("DOMContentLoaded", () => {

    // SMOOTH SCROLLING
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const target = document.querySelector(
                link.getAttribute("href")
            );

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });


    // WINDOWS 95 POPUP
    const intro = document.getElementById("retroIntro");
    const stack = document.getElementById("errorStack");
    const counter = document.getElementById("introCounter");

    if (!intro || !stack || !counter) return;

    const dialogs = Array.from(
        stack.querySelectorAll(".error-window")
    );

    let remaining = dialogs.length;
    let isClosing = false;

    function updateCounter() {
        counter.textContent =
            `ERROR ${String(remaining).padStart(2, "0")} / ${String(dialogs.length).padStart(2, "0")}`;
    }

    stack.addEventListener("click", (event) => {

        const button = event.target.closest(".error-ok");

        if (!button || isClosing || remaining <= 0) return;

        isClosing = true;
        button.disabled = true;

        const currentDialog = dialogs[remaining - 1];

        currentDialog.classList.add("removing");

        setTimeout(() => {

            currentDialog.remove();
            remaining--;

            updateCounter();
            isClosing = false;

            if (remaining === 0) {

                intro.classList.add("finished");

                setTimeout(() => {
                    intro.remove();
                }, 600);

            }

        }, 200);

    });

    updateCounter();

});
