document.addEventListener('DOMContentLoaded', () => {
    const botonDescargar = document.getElementById('descargarPDF');

    botonDescargar.addEventListener('click', async () => {
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;

        // Modificar el PDF existente con los datos del usuario
        const pdfBytes = await modificarPDF(nombre, email, telefono);

        // Descargar PDF modificado
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'datos_usuario.pdf';
        link.click();
    });
});

async function cargarPDF() {
    const pdfUrl = './recursos/plantilla.pdf';
    const pdfBuffer = await fetch(pdfUrl).then((res) => res.arrayBuffer());
    return pdfBuffer;
}

async function modificarPDF(nombre, email, telefono) {
    const pdfBuffer = await cargarPDF();
    const { PDFDocument } = PDFLib;

    const pdfDoc = await PDFDocument.load(pdfBuffer);

    // Obtener el formulario y llenar los campos
    const form = pdfDoc.getForm();
    form.getTextField('nombre').setText(nombre);
    form.getTextField('email').setText(email);
    form.getTextField('telefono').setText(telefono);

    // Finalizar el formulario y aplicar los cambios
    form.flatten();

    // Serializar el PDF modificado
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
}