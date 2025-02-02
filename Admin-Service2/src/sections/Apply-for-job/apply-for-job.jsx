import React, { useRef, useEffect } from 'react';

export default function JobApplicationForm() {
  const iframeContainerRef = useRef(null);

  useEffect(() => {
    let iframe = document.createElement('iframe');
    iframe.src =
      'https://forms.zohopublic.in/ashokatodaytechnologyprivate/form/JobApplicationForm/formperma/-opI4SCwg70V7eDGMl7i2Dw9urIeB1aLhll0ctGOKdI?zf_rszfm=1';
    iframe.style.border = 'none';
    iframe.style.height = '443px';
    iframe.style.width = '90%';
    iframe.style.transition = 'all 0.5s ease';
    iframe.setAttribute('aria-label', 'Job Application Form');

    const container = iframeContainerRef.current;
    container.appendChild(iframe);

    const handleMessage = (event) => {
      const evntData = event.data;
      if (evntData && typeof evntData === 'string') {
        const zf_ifrm_data = evntData.split('|');
        if (zf_ifrm_data.length === 2 || zf_ifrm_data.length === 3) {
          const zf_perma = zf_ifrm_data[0];
          // const zf_ifrm_ht_nw = (parseInt(zf_ifrm_data[1], 10) + 15) + 'px';
          const zf_ifrm_ht_nw = `${parseInt(zf_ifrm_data[1], 10) + 15}px`;
          iframe = container.getElementsByTagName('iframe')[0];
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

    return () => {
      window.removeEventListener('message', handleMessage, false);
      if (container && iframe) {
        container.removeChild(iframe);
      }
    };
  }, []);

  return (
    <div
      style={{ marginTop: '20px', marginLeft: '30px' }}
      id="zf_div_-opI4SCwg70V7eDGMl7i2Dw9urIeB1aLhll0ctGOKdI"
      ref={iframeContainerRef}
    />
  );
}
