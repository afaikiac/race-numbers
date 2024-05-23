import { jsPDF } from "jspdf"
import { head, range } from "lodash"
import { QRCodeFileType, QRCode, toBuffer, toCanvas } from "qrcode"

const doc = new jsPDF({
    orientation: "l",
    unit: "mm",
    // format: [ 80, 297 ],
    // format: [ 210/2, 297 ],
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

const firstOffsetY = 25 
const secondOffsetY = firstOffsetY + 84 
const headX = 34 
const headReverseX = 52 - headX
const headY = 17.5
const headFont = 55
const glyphX = 86 
const glyphY = 13 
const glyphFont = 40 
const numberX = 7 
const numberY = 75
const numberFont = 180 

const getRandomChar = () => {
    const str = "ADGHUVZT"
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

const generate = async () => {
    const qr = await toBuffer("https://t.me/tourdeklenovo", {
        margin: 0,
        scale: 10
    })

    range(1, 51).reverse().map(N => {
    
        const numberStr = `${N.toString().length === 1 ? "0" : ""}${N.toString()}`
        const numberReverseX = getReverseNumberX(
            [ ...numberStr.matchAll(/1/g)].length,
            numberX
        )
        
        doc.addPage()
        
        doc.line(4, firstOffsetY - 4, 9, firstOffsetY-4)
        doc.line(pageWidth - 9, firstOffsetY - 4, pageWidth - 4, firstOffsetY - 4)

        doc.setFillColor("black")
        doc.rect(10, firstOffsetY, pageWidth - 20, 25, "f")
        doc.addImage(qr, 4, firstOffsetY, 25, 25)
        doc.addImage(qr, pageWidth - 29, firstOffsetY, 25, 25)

        // -

        doc.setFont("france", "bold")
        doc.setTextColor("white")
        doc.setFontSize(headFont)
        doc.text("Tour de klenovo", headX, firstOffsetY + headY)


        doc.setFont("france-glyphs", "normal")
        doc.setTextColor("white")
        doc.setFontSize(glyphFont)
        doc.text(getRandomChar(), headX + glyphX, firstOffsetY + glyphY)

        doc.setFont("kallisto", "italic-bold")
        doc.setTextColor("black")
        doc.setFontSize(numberFont)
        doc.text(numberStr, numberX, firstOffsetY + numberY)

        // -

        doc.setFont("france", "bold")
        doc.setTextColor("white")
        doc.setFontSize(headFont)
        doc.text("Tour de klenovo", middleX + headReverseX, firstOffsetY + headY)

        doc.setFont("france-glyphs", "normal")
        doc.setTextColor("white")
        doc.setFontSize(glyphFont)
        doc.text(getRandomChar(), middleX + headReverseX + glyphX, firstOffsetY + glyphY)

        doc.setFont("kallisto", "italic-bold")
        doc.setTextColor("black")
        doc.setFontSize(numberFont)
        doc.text(numberStr, middleX + numberReverseX, firstOffsetY + numberY)

        doc.setFont("france", "bold")
        doc.setTextColor("black")
        doc.setFontSize(17)

        "tour de klenovo".split("").reduce((offsetY: number, ch) => {
            doc.text(ch, middleX + 1, offsetY)
            return offsetY + 3.2 
        }, firstOffsetY + 32)

        const numberAppend = 50
        const number2Str = `${(N + numberAppend).toString().length === 1 ? "0" : ""}${(N + numberAppend).toString()}`
        const numberReverse2X = getReverseNumberX(
            [ ...number2Str.matchAll(/1/g)].length,
            numberX
        )

        doc.line(4, secondOffsetY - 4, 9, secondOffsetY-4)
        doc.line(pageWidth - 9, secondOffsetY - 4, pageWidth - 4, secondOffsetY - 4)

        doc.line(4, secondOffsetY - 4 + 84, 9, secondOffsetY-4 + 84)
        doc.line(pageWidth - 9, secondOffsetY - 4 + 84, pageWidth - 4, secondOffsetY - 4 + 84)

        doc.setFillColor("black")
        doc.rect(10, secondOffsetY, pageWidth - 20, 25, "f")
        doc.addImage(qr, 4, secondOffsetY, 25, 25)
        doc.addImage(qr, pageWidth - 29, secondOffsetY, 25, 25)

        // -

        doc.setFont("france", "bold")
        doc.setTextColor("white")
        doc.setFontSize(headFont)
        doc.text("Tour de klenovo", headX, secondOffsetY + headY)


        doc.setFont("france-glyphs", "normal")
        doc.setTextColor("white")
        doc.setFontSize(glyphFont)
        doc.text(getRandomChar(), headX + glyphX, secondOffsetY + glyphY)

        doc.setFont("kallisto", "italic-bold")
        doc.setTextColor("black")
        doc.setFontSize(numberFont)
        doc.text(number2Str, numberX, secondOffsetY + numberY)

        // -

        doc.setFont("france", "bold")
        doc.setTextColor("white")
        doc.setFontSize(headFont)
        doc.text("Tour de klenovo", middleX + headReverseX, secondOffsetY + headY)

        doc.setFont("france-glyphs", "normal")
        doc.setTextColor("white")
        doc.setFontSize(glyphFont)
        doc.text(getRandomChar(), middleX + headReverseX + glyphX, secondOffsetY + glyphY)

        doc.setFont("kallisto", "italic-bold")
        doc.setTextColor("black")
        doc.setFontSize(numberFont)
        doc.text(number2Str, middleX + numberReverse2X, secondOffsetY + numberY)

        doc.setFont("france", "bold")
        doc.setTextColor("black")
        doc.setFontSize(17)

        "tour de klenovo".split("").reduce((offsetY: number, ch) => {
            doc.text(ch, middleX + 1, offsetY)
            return offsetY + 3.2 
        }, secondOffsetY + 32)

    })

    doc
        .deletePage(1)
        .save("scripts/klenovo/race-numbers-klenovo.pdf")
}

generate()
