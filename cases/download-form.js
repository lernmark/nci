(() => {
    const pdfs = {
        "3STEPIT": "NCI_Case_3STEPIT_20261026.pdf",
        Cemvision: "NCI_Case_Cemvision_20261026.pdf",
        Foxway: "NCI_Case_Foxway_20261026.pdf",
        Kerecis: "NCI_Case_Kerecis_20261026.pdf",
        Movement: "NCI_Case_Movement_20261026.pdf",
        NSC: "NCI_Case_NordicSaltCycle_20261026.pdf",
        OBO: "NCI_Case_OBO_20261026.pdf",
        Papershell: "NCI_Case_Papershell_20261026.pdf",
        Tise: "NCI_Case_Tise_20261026.pdf",
        TOMRA: "NCI_Case_TOMRA_20261026.pdf"
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
