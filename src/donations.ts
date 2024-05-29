import { readFileSync, writeFileSync } from "fs"

import { jsPDF } from "jspdf"
import { head, range } from "lodash"
import { QRCodeFileType, QRCode, toBuffer, toCanvas } from "qrcode"

const doc = new jsPDF({
    orientation: "l",
    unit: "mm",
    format: "a4",
    putOnlyUsedFonts:true
})

doc.addFont("src/Sudfrance/sudfrancebevel.ttf", "france", "bevel")
doc.addFont("src/Sudfrance/sudfrancebold.ttf", "france", "bold")
doc.addFont("src/Kallisto/KallistoBoldItalic.ttf", "kallisto", "italic-bold")
doc.addFont("src/Kallisto/KallistoBold.ttf", "kallisto", "normal-bold")
doc.addFont("src/Sudfrance/sudfrancedingbatz.ttf", "france-glyphs", "normal")
doc.addFont("src/Roboto/Roboto-Regular.ttf", "r", "r")

const pageWidth = doc.internal.pageSize.getWidth()
const pageHeight = doc.internal.pageSize.getHeight()

const middleX = pageWidth / 2
const middleY = pageHeight / 2

const firstOffsetY = 7
const secondOffsetY = firstOffsetY + 147.5  
const headX = 65 
const headReverseX = 52 - headX
const headY = 17.5
const headFont = 54
const glyphX = 111
const glyphY = 13 
const glyphFont = 40 
const numberX = 7
const numberY = 110.5
const numberFont = 210
const qrX = 7

const shovel = readFileSync("src/shovel.png")
const qr = readFileSync("src/my_QR.png")

const generate = async () => {
    // const qr = await toBuffer("https://t.me/gravelcyclist", {
    //     margin: 0,
    //     scale: 10
    // })

    
    doc.addPage()
        
    doc.setFillColor("black")
    doc.rect(10, firstOffsetY, pageWidth - 17, 25, "f")
    doc.addImage(qr, qrX, firstOffsetY, 25, 25)
    doc.addImage(qr, pageWidth - 25 - 7, firstOffsetY, 25, 25)

    // -

    doc.setFont("france", "bold")
    doc.setTextColor("white")
    doc.setFontSize(headFont)
    doc.text("Tarusa Gravel Race   2024", headX, firstOffsetY + headY)


    doc.addImage(shovel, headX + glyphX, firstOffsetY + 3, 15, 20)

    doc.setFont("kallisto", "normal-bold")
    doc.setTextColor("black")
    doc.setFontSize(140)
    doc.text("DONATION", middleX, 80, {
        align: "center"
    })
    

    doc.addImage(qr, 40, 100, 70, 70)


    doc.setFont("r", "r")
    doc.setTextColor("black")
    doc.setFontSize(30)
    doc.text("Анатолий Анатольевич Н.", 40, pageHeight - 25)
    doc.text("+7 963 650 6091", 40, pageHeight - 12)

    doc.addPage()

    doc.setFillColor("black")
    doc.rect(10, firstOffsetY, pageWidth - 17, 25, "f")
    doc.addImage(qr, qrX, firstOffsetY, 25, 25)
    doc.addImage(qr, pageWidth - 25 - 7, firstOffsetY, 25, 25)

    // -

    doc.setFont("france", "bold")
    doc.setTextColor("white")
    doc.setFontSize(headFont)
    doc.text("Tarusa Gravel Race   2024", headX, firstOffsetY + headY)


    doc.addImage(shovel, headX + glyphX, firstOffsetY + 3, 15, 20)

    doc.setFont("kallisto", "normal-bold")
    doc.setTextColor("black")
    doc.setFontSize(140)
    doc.text("DONATION", middleX, 80, {
        align: "center"
    })

    doc.setFillColor("black")
    doc.rect(10, firstOffsetY + middleY, pageWidth - 17, 25, "f")
    doc.addImage(qr, qrX, firstOffsetY + middleY, 25, 25)
    doc.addImage(qr, pageWidth - 25 - 7, firstOffsetY + middleY, 25, 25)

    // -

    doc.setFont("france", "bold")
    doc.setTextColor("white")
    doc.setFontSize(headFont)
    doc.text("Tarusa Gravel Race   2024", headX, firstOffsetY + headY + middleY)


    doc.addImage(shovel, headX + glyphX, firstOffsetY + 3 + middleY, 15, 20)

    doc.setFont("kallisto", "normal-bold")
    doc.setTextColor("black")
    doc.setFontSize(140)
    doc.text("DONATION", middleX, 80 + middleY, {
        align: "center"
    })


    doc.line(4, middleY, 9, middleY)
    doc.line(pageWidth - 9, middleY, pageWidth - 4, middleY)
    doc
        .deletePage(1)
        .save("src/donations.pdf")
}

generate()
