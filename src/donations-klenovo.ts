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
doc.addFont("src/Neucha/Neucha-Regular.ttf", "neucha", "regular")

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
const glyphX = 101
const glyphY = 13 
const glyphFont = 40 
const numberX = 7
const numberY = 110.5
const numberFont = 210
const qrX = 7
const sberX = 118
const sberY = 150

const shovel = readFileSync("src/shovel.png")
const sber = readFileSync("src/sber.png")
const qrSbp = readFileSync("src/my_QR.png")
const arrow = readFileSync("src/arrow.png")
const arrow2 = readFileSync("src/arrow2.png")

const generate = async () => {


    const qrTg = await toBuffer("https://t.me/tourdeklenovo", {
        margin: 0,
        scale: 10
    })
    
    doc.addPage()
        
    // -

    doc.setFillColor("black")
    doc.rect(7, firstOffsetY, pageWidth - 14, 25, "f")
    doc.addImage(qrTg, qrX, firstOffsetY, 25, 25)
    doc.addImage(qrTg, pageWidth - 25 - 7, firstOffsetY, 25, 25)

    doc.setFont("france", "bold")
    doc.setTextColor("white")
    doc.setFontSize(headFont)
    doc.text("Tour de Klenovo    2024", middleX, firstOffsetY + headY, {
        align: "center"
    })

    doc.setFont("france-glyphs", "normal")
    doc.setTextColor("white")
    doc.setFontSize(glyphFont)
    doc.text("D", headX + glyphX, firstOffsetY + glyphY)

    doc.setFont("kallisto", "normal-bold")
    doc.setTextColor("black")
    doc.setFontSize(140)
    doc.text("DONATION", middleX, 80, {
        align: "center"
    })

    doc.addImage(qrSbp, 30, 110, 70, 70)

    doc.setLineWidth(2)
    doc.roundedRect(30-2.5, 110 - 2.5, 75, 75, 0.5, 0.5)

    doc.roundedRect(165, 110 - 2.5 + 75 - 20, pageWidth - 165 - 30, 20, 0.5, 0.5)

    doc.setFont("neucha", "regular")
    doc.setTextColor("black")
    doc.setFontSize(30)
    doc.text("Анатолий Анатольевич Н.", pageWidth - 30, 117, {
        align: "right"
    })
    doc.text("тел. +7 (963) 650-60-91", 165, 130)

    doc.setFontSize(35)
    doc.text("Сбер", sberX, sberY)
    doc.addImage(sber, sberX + 25, sberY - 9, 10, 10)
    doc.addImage(arrow2, sberX - 9, sberY - 33, 20, 20)
    doc.addImage(arrow, sberX + 19, sberY - 33, 20, 20)

    // -

    doc.addPage()

    // -

    doc.setFillColor("black")
    doc.rect(7, firstOffsetY, pageWidth - 14, 25, "f")
    doc.addImage(qrTg, qrX, firstOffsetY, 25, 25)
    doc.addImage(qrTg, pageWidth - 25 - 7, firstOffsetY, 25, 25)

    doc.setFont("france", "bold")
    doc.setTextColor("white")
    doc.setFontSize(headFont)
    doc.text("Tour de Klenovo    2024", middleX, firstOffsetY + headY, {
        align: "center"
    })

    doc.setFont("france-glyphs", "normal")
    doc.setTextColor("white")
    doc.setFontSize(glyphFont)
    doc.text("D", headX + glyphX, firstOffsetY + glyphY)

    doc.setFont("kallisto", "normal-bold")
    doc.setTextColor("black")
    doc.setFontSize(140)
    doc.text("DONATION", middleX, 80, {
        align: "center"
    })

    // -

    doc.setLineWidth(0.1)
    doc.line(4, middleY, 9, middleY)
    doc.line(pageWidth - 9, middleY, pageWidth - 4, middleY)

    // -

    doc.setFillColor("black")
    doc.rect(7, firstOffsetY + middleY, pageWidth - 14, 25, "f")
    doc.addImage(qrTg, qrX, firstOffsetY + middleY, 25, 25)
    doc.addImage(qrTg, pageWidth - 25 - 7, firstOffsetY + middleY, 25, 25)

    doc.setFont("france", "bold")
    doc.setTextColor("white")
    doc.setFontSize(headFont)
    doc.text("Tour de Klenovo    2024", middleX, firstOffsetY + headY + middleY, {
        align: "center"
    })

    doc.setFont("france-glyphs", "normal")
    doc.setTextColor("white")
    doc.setFontSize(glyphFont)
    doc.text("D", headX + glyphX, firstOffsetY + glyphY + middleY)

    doc.setFont("kallisto", "normal-bold")
    doc.setTextColor("black")
    doc.setFontSize(140)
    doc.text("DONATION", middleX, 80 + middleY, {
        align: "center"
    })
    
    // -

    doc
        .deletePage(1)
        .save("donations-klenovo.pdf")
}

generate()
