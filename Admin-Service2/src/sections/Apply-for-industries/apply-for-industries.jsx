import React, { useEffect } from 'react';

const ZohoForm = () => {
  useEffect(() => {
    let iframe; // Declare iframe outside try block
     // Handle the window message event
     const handleMessage = (event) => {
      const evntData = event.data;
      if (evntData && typeof evntData === 'string') {
        const zf_ifrm_data = evntData.split('|');
        if (zf_ifrm_data.length === 2 || zf_ifrm_data.length === 3) {
          const zf_perma = zf_ifrm_data[0];
          const zf_ifrm_ht_nw = `${parseInt(zf_ifrm_data[1], 10) + 15}px`;
          if (iframe.src.indexOf('formperma') > 0 && iframe.src.indexOf(zf_perma) > 0) {
            const prevIframeHeight = iframe.style.height;
            if (prevIframeHeight !== zf_ifrm_ht_nw) {
              if (zf_ifrm_data.length === 3) {
                iframe.scrollIntoView();
                setTimeout(() => {
                  iframe.style.height = zf_ifrm_ht_nw;
                }, 500);
              } else {
                iframe.style.height = zf_ifrm_ht_nw;
              }
            }
          }
        }
      }
    };
    try {
      // Create the iframe element
      iframe = document.createElement('iframe');
      iframe.src = 'https://forms.zohopublic.in/ashokatodaytechnologyprivate/form/Applyforindustry/formperma/A9DaPS4uwZ1N9dZRlAxpC3BvSQrbi_slNYGFgKkYU-0?zf_rszfm=1';
      iframe.style.border = 'none';
      iframe.style.height = '150px';
      iframe.style.width = '90%';
      iframe.style.transition = 'all 0.5s ease';
      iframe.setAttribute('aria-label', 'APPLY FOR SETTING UP AGRICULTURAL SMALL INDUSTRY');

      // Append the iframe to the div
      const container = document.getElementById('zf_div_A9DaPS4uwZ1N9dZRlAxpC3BvSQrbi_slNYGFgKkYU-0');
      if (container) {
        container.appendChild(iframe);
      }

     

      window.addEventListener('message', handleMessage, false);
    } catch (e) {
      console.error(e);
    }

    return () => {
      window.removeEventListener('message', handleMessage);
      if (iframe) {
        iframe.remove(); // Clean up the iframe if it was created
      }
    };
  }, []);

  return (
    <div style={{ marginTop: '20px', marginLeft: '30px' }}
     id="zf_div_A9DaPS4uwZ1N9dZRlAxpC3BvSQrbi_slNYGFgKkYU-0" />
  );
};

export default ZohoForm;
