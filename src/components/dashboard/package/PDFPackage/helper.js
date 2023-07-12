import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode'

export function generateBarCode(data, options) {
  const canvas = document.createElement('canvas')
  JsBarcode(canvas, data, { displayValue: false, ...options })
  return canvas.toDataURL()
}

export function generateQRCode(data) {
  const canvas = document.createElement('canvas')
  QRCode.toCanvas(canvas, data)
  return canvas.toDataURL()
}
