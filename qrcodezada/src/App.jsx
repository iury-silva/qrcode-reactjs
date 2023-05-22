import { useState, useRef } from 'react'
import './App.css'
import QRCode from 'react-qr-code'
import domtoimage from 'dom-to-image'

function App() {
  
  const [link, setLink] = useState("");
  const qrCodeRef = useRef(null)

  const downloadQRCode = () => {
    domtoimage.toPng(qrCodeRef.current)
      .then(function (dataUrl) {
        const link = document.createElement('a')
        link.download = 'qrcode.png'
        link.href = dataUrl
        link.click()
      })
      .catch(function (error) {
        console.error('Erro ao salvar o QR Code:', error)
      })
  }


  return (
    <>
    <div ref={qrCodeRef}>
        <QRCode value={link} />
    </div>

    <div className='flex flex-col'>
      <label htmlFor="url-qr" className='mb-3 mt-3 font-bold'>Gere seu QRCode</label>
      <input className='p-2 rounded-xl' id="url-qr" type="text" value={link} onChange={(e) => setLink(e.target.value)}/>
    </div>

    <button onClick={downloadQRCode} className='p-2 mt-3 rounded-lg bg-blue-500 text-white'>Baixar QRCode</button>

    </>
  )
}

export default App
