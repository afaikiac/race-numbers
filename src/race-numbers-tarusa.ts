import { readFileSync, writeFileSync } from "fs"

import { jsPDF } from "jspdf"
import { head, range } from "lodash"
import { QRCodeFileType, QRCode, toBuffer, toCanvas } from "qrcode"

const doc = new jsPDF({
    orientation: "p",
    unit: "mm",
    format: "a4",
    putOnlyUsedFonts:true
})

doc.addFont("src/Sudfrance/sudfrancebevel.ttf", "france", "bevel")
doc.addFont("src/Sudfrance/sudfrancebold.ttf", "france", "bold")
doc.addFont("src/Kallisto/KallistoBoldItalic.ttf", "kallisto", "italic-bold")
doc.addFont("src/Kallisto/KallistoBold.ttf", "kallisto", "normal-bold")
doc.addFont("src/Sudfrance/sudfrancedingbatz.ttf", "france-glyphs", "normal")

const pageWidth = doc.internal.pageSize.getWidth()
const pageHeight = doc.internal.pageSize.getHeight()

const middleX = pageWidth / 2
const middleY = pageHeight / 2

const firstOffsetY = 7
const secondOffsetY = firstOffsetY + 147.5  
const headX = 45 
const headY = 17.5
const headFont = 60
const headPicX = 83 
const headPicY = 3 
const numberY = 110.5
const numberFont = 210
const qrX = 7

const shovel = readFileSync("src/hammer.png")

const generate = async () => {
    const qr = await toBuffer("https://t.me/gravelcyclist", {
        margin: 0,
        scale: 10
    })

    range(1, 51).reverse().map(N => {
    
        doc.addPage()

        // -

        const numberStr = `${N.toString().length === 1
            ? "00"
            : N.toString().length === 2
                ? "0"
                : ""}${N.toString()}`

        doc.setFillColor("black")
        doc.rect(10, firstOffsetY, pageWidth - 17, 25, "f")
        doc.addImage(qr, qrX, firstOffsetY, 25, 25)

        doc.setFont("france", "bold")
        doc.setTextColor("white")
        doc.setFontSize(headFont)
        doc.text("Gravelcyclist   2024", headX, firstOffsetY + headY)

        doc.addImage(shovel, headX + headPicX, firstOffsetY + headPicY, 15, 18)

        doc.setFont("kallisto", "normal-bold")
        doc.setTextColor("black")
        doc.setFontSize(numberFont)
        doc.text(numberStr, middleX, firstOffsetY + numberY, {
            align: "center"
        })

        // -

        const N2 = N + 50 
        const number2Str = `${N2.toString().length === 1
            ? "00"
            : N2.toString().length === 2
                ? "0"
                : ""}${N2.toString()}`

        doc.line(4, secondOffsetY - firstOffsetY, 9, secondOffsetY - firstOffsetY)
        doc.line(pageWidth - 9, secondOffsetY - firstOffsetY, pageWidth - 4, secondOffsetY - firstOffsetY)

        doc.setFillColor("black")
        doc.rect(10, secondOffsetY, pageWidth - 17, 25, "f")
        doc.addImage(qr, qrX, secondOffsetY, 25, 25)

        doc.setFont("france", "bold")
        doc.setTextColor("white")
        doc.setFontSize(headFont)
        doc.text("Gravelcyclist   2024", headX, secondOffsetY + headY)

        doc.addImage(shovel, headX + headPicX, secondOffsetY + headPicY, 15, 18)

        doc.setFont("kallisto", "normal-bold")
        doc.setTextColor("black")
        doc.setFontSize(numberFont)
        doc.text(number2Str, middleX, secondOffsetY + numberY, {
            align: "center"
        })
    })

    doc
        .deletePage(1)
        .save("race-numbers-tarusa.pdf")
}

generate()
