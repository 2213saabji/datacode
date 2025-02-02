import React, { useEffect } from 'react';

const PropertyForm = () => {
  useEffect(() => {
    const f = document.createElement('iframe');
    f.src =
      'https://forms.zohopublic.in/ashokatodaytechnologyprivate/form/PropertyEnquiryForm/formperma/dZy806SoIco2uiXrM2AXtJVD0nDDf-tCRA4p-BLWWnU?zf_rszfm=1&zf_enablecamera=true';
    f.style.border = 'none';
    f.style.height = '150px';
    f.style.width = '90%';
    f.style.transition = 'all 0.5s ease';
    f.setAttribute('aria-label', 'PROPERTY FORM');
    f.setAttribute('allow', 'camera;');
    const d = document.getElementById('zf_div_dZy806SoIco2uiXrM2AXtJVD0nDDf-tCRA4p-BLWWnU');
    d.appendChild(f);

    const handleMessage = (event) => {
      const evntData = event.data;
      if (evntData && evntData.constructor === String) {
        const zf_ifrm_data = evntData.split('|');
        if (zf_ifrm_data.length === 2 || zf_ifrm_data.length === 3) {
          const zf_perma = zf_ifrm_data[0];
          const zf_ifrm_ht_nw = `${parseInt(zf_ifrm_data[1], 10) + 15}px`;
          const iframe = document
            .getElementById('zf_div_dZy806SoIco2uiXrM2AXtJVD0nDDf-tCRA4p-BLWWnU')
            .getElementsByTagName('iframe')[0];
          if (iframe.src.includes('formperma') && iframe.src.includes(zf_perma)) {
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

    window.addEventListener('message', handleMessage, false);

    // Cleanup function
    return () => {
      window.removeEventListener('message', handleMessage, false);
    };
  }, []);

  return (
    <div
      style={{ marginTop: '20px', marginLeft: '30px' }}
      id="zf_div_dZy806SoIco2uiXrM2AXtJVD0nDDf-tCRA4p-BLWWnU"
    />
  );
};

export default PropertyForm;
