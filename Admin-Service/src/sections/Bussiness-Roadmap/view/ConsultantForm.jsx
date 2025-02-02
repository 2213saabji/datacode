import React, { useEffect } from 'react';

const ConsultantForm = () => {
  useEffect(() => {
    const handleMessage = (event) => {
      const evntData = event.data;
      if (evntData && evntData.constructor === String) {
        const zf_ifrm_data = evntData.split('|');
        if (zf_ifrm_data.length === 2 || zf_ifrm_data.length === 3) {
          const zf_perma = zf_ifrm_data[0];
          const zf_ifrm_ht_nw = `${parseInt(zf_ifrm_data[1], 10) + 15}px`;
          const iframe = document
            .getElementById('zf_div_Yh_ei21OEAhU4SJe9TFn3TZMi9F4a1PoOQ6tH4l7ddM')
            .getElementsByTagName('iframe')[0];
          if (iframe.src.indexOf('formperma') > 0 && iframe.src.indexOf(zf_perma) > 0) {
            const prevIframeHeight = iframe.style.height;
            let zf_tout = false;
            if (zf_ifrm_data.length === 3) {
              iframe.scrollIntoView();
              zf_tout = true;
            }
            if (prevIframeHeight !== zf_ifrm_ht_nw) {
              if (zf_tout) {
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
      const f = document.createElement('iframe');
      f.src =
        'https://forms.zohopublic.in/ashokatodaytechnologyprivate/form/RequestConsultancy1/formperma/Yh_ei21OEAhU4SJe9TFn3TZMi9F4a1PoOQ6tH4l7ddM?zf_rszfm=1';
      f.style.border = 'none';
      f.style.height = '150px';
      f.style.width = '90%';
      f.style.transition = 'all 0.5s ease';
      f.setAttribute('aria-label', 'Request Consultancy');

      const d = document.getElementById('zf_div_Yh_ei21OEAhU4SJe9TFn3TZMi9F4a1PoOQ6tH4l7ddM');
      d.appendChild(f);

      window.addEventListener('message', handleMessage, false);
    } catch (e) {
      console.error(e);
    }

    return () => {
      window.removeEventListener('message', handleMessage, false);
    };
  }, []);

  return (
    <div
      style={{ marginLeft: '30px', marginTop: '20px' }}
      id="zf_div_Yh_ei21OEAhU4SJe9TFn3TZMi9F4a1PoOQ6tH4l7ddM"
    />
  );
};

export default ConsultantForm;
