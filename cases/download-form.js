(() => {
    const pdfs = {
        "3STEPIT": "NCI WEB_3stepIT.pdf",
        Cemvision: "NCI WEB_CEMVISION.pdf",
        Foxway: "NCI WEB_foxway.pdf",
        Kerecis: "NCI WEB_kerecis.pdf",
        Movement: "NCI WEB_movement.pdf",
        NSC: "NCI WEB_NSC.pdf",
        OBO: "NCI WEB_OBO.pdf",
        Papershell: "NCI WEB_papershell.pdf",
        Tise: "NCI WEB_tise.pdf",
        TOMRA: "NCI WEB_TOMRA.pdf"
    };

    const form = document.querySelector('form[name="download-case"]');
    if (!form) return;

    const pdfUrl = new URL(encodeURIComponent(pdfs[form.elements.case.value]), location.href).href;
    const button = form.querySelector('button[type="submit"]');
    const status = document.createElement("p");
    status.setAttribute("role", "status");
    status.className = "text-[#0033FF] text-sm font-semibold";
    form.append(status);

    const startDownload = () => {
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = "";
        document.body.append(link);
        link.click();
        link.remove();
    };

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        button.disabled = true;
        status.textContent = "";

        const body = new URLSearchParams(new FormData(form));
        body.set("form-name", form.getAttribute("name"));

        try {
            const response = await fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: body.toString()
            });
            if (!response.ok) throw new Error(response.status);

            form.reset();
            status.innerHTML = 'Thank you! Your download is starting. <a href="' + pdfUrl + '" download class="underline">Download again</a>';
            startDownload();
        } catch {
            status.textContent = "Something went wrong. Please try again.";
        } finally {
            button.disabled = false;
        }
    });
})();
