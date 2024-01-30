import JSZip from 'jszip';

export const handleDownload = async (product) => {
    if (product && product.digitalProduct) {
      const zip = new JSZip();
      const imgBlob = await fetch(product.digitalProduct).then((res) => res.blob());

      // Add the image blob to the zip file
      zip.file('digital_product.zip', imgBlob);

      // Generate the zip file
      const zipBlob = await zip.generateAsync({ type: 'blob' });

      // Create a link element
      const link = document.createElement('a');
      link.href = URL.createObjectURL(zipBlob);
      link.download = 'digital_product.zip';

      // Append the link to the body
      document.body.appendChild(link);

      // Trigger a click on the link to start the download
      link.click();

      // Remove the link from the body
      document.body.removeChild(link);
    }
};