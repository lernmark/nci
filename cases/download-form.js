(() => {
    const pdfs = {
        "3STEPIT": "NCI Case_3STEPIT_REV20261022.pdf",
        Cemvision: "NCI Case_Cemvision_rev20261022.pdf",
        Foxway: "NCI Case_foxway_rev20261022.pdf",
        Kerecis: "NCI Case_Kerecis_rev20261022.pdf",
        Movement: "NCI Case_Movement_rev20261022.pdf",
        NSC: "NCI Case_NordicSaltCycle_rev20261022.pdf",
        OBO: "NCI Case_OBO_REV20261022.pdf",
        Papershell: "NCI Case_Papershell_rev20261022.pdf",
        Tise: "NCI Case_Tise_rev20261022.pdf",
        TOMRA: "NCI Case_tomra_REV20261022.pdf"
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
