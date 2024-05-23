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

doc.addFont("scripts/klenovo/Sudfrance/sudfrancebevel.ttf", "france", "bevel")
doc.addFont("scripts/klenovo/Sudfrance/sudfrancebold.ttf", "france", "bold")
doc.addFont("scripts/klenovo/Kallisto/KallistoBoldItalic.ttf", "kallisto", "italic-bold")
doc.addFont("scripts/klenovo/Kallisto/KallistoBold.ttf", "kallisto", "normal-bold")
doc.addFont("scripts/klenovo/Sudfrance/sudfrancedingbatz.ttf", "france-glyphs", "normal")

const pageWidth = doc.internal.pageSize.getWidth()
const pageHeight = doc.internal.pageSize.getHeight()

const middleX = pageWidth / 2
const middleY = pageHeight / 2

const firstOffsetY = 7
const secondOffsetY = firstOffsetY + 147.5  
const headX = 36 
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

const getRandomChar = () => {
    // const str = "ADGHUVZT"
    const str = "V"
    return str[Math.floor(Math.random() * str.length)]
}

function getReverseNumberX(oneCount: number, offsetX: number) {
    return oneCount === 1
        ? 70 - offsetX
        : oneCount === 2
            ? 97 - offsetX
            : 50 - offsetX
    // : 47 - numberX
}

const shovel = readFileSync("scripts/klenovo/shovel.png")

const generate = async () => {
    const qr = await toBuffer("https://t.me/gravelcyclist", {
        margin: 0,
        scale: 10
    })

    range(1, 151).reverse().map(N => {
    
        const numberStr = `${N.toString().length === 1
            ? "00"
            : N.toString().length === 2
                ? "0"
                : ""}${N.toString()}`
        const numberReverseX = getReverseNumberX(
            [ ...numberStr.matchAll(/1/g)].length,
            numberX
        )
        
        doc.addPage()
        

        doc.setFillColor("black")
        doc.rect(10, firstOffsetY, pageWidth - 17, 25, "f")
        doc.addImage(qr, qrX, firstOffsetY, 25, 25)

        // -

        doc.setFont("france", "bold")
        doc.setTextColor("white")
        doc.setFontSize(headFont)
        doc.text("Tarusa Gravel Race   2024", headX, firstOffsetY + headY)


        doc.addImage(shovel, headX + glyphX, firstOffsetY + 3, 15, 20)

        doc.setFont("kallisto", "normal-bold")
        doc.setTextColor("black")
        doc.setFontSize(numberFont)
        doc.text(numberStr, middleX, firstOffsetY + numberY, {
            align: "center"
        })

        // -

        const numberAppend = 150
        const number2Str = `${(N + numberAppend).toString().length === 1
            ? "00"
            : N.toString().length === 2
                ? "0"
                : ""}${(N + numberAppend).toString()}`

        doc.line(4, secondOffsetY - firstOffsetY, 9, secondOffsetY - firstOffsetY)
        doc.line(pageWidth - 9, secondOffsetY - firstOffsetY, pageWidth - 4, secondOffsetY - firstOffsetY)

        doc.setFillColor("black")
        doc.rect(10, secondOffsetY, pageWidth - 17, 25, "f")
        doc.addImage(qr, qrX, secondOffsetY, 25, 25)

        // -

        doc.setFont("france", "bold")
        doc.setTextColor("white")
        doc.setFontSize(headFont)
        doc.text("Tarusa Gravel Race   2024", headX, secondOffsetY + headY)


        doc.addImage(shovel, headX + glyphX, secondOffsetY + 3, 15, 20)

        doc.setFont("kallisto", "normal-bold")
        doc.setTextColor("black")
        doc.setFontSize(numberFont)
        doc.text(number2Str, middleX, secondOffsetY + numberY, {
            align: "center"
        })
    })

    doc
        .deletePage(1)
        .save("scripts/klenovo/race-numbers-tarusa.pdf")
}

generate()
