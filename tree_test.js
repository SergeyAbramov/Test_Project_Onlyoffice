
const fs = require('fs');

function drawCustomTree(branchRows, outputPath) {

    if (branchRows < 1) {
        throw new Error("Количество веток должно быть положительным целым числом > 1");
    }

    if (typeof outputPath !== 'string') {
        throw new Error("Путь должен быть строкой");
    }

    // Ствол состоящий из двух рядов буквы Т - 5 шт
    const trunkHeight = 2;
    const trunkWidth = 5;

    // Считаем ширину нижней ветки в зависимомти от входных данных:
    // Так как первая с верху ветка состоит из 6 символов и последующие увеличиваются на 4 то ветки будут 6; 10; 14; 22 и т.д.
    const bottomWidth = 6 + (branchRows - 1) * 4;

    // Хардкодим верхнюю "Звезду"
    const wSpaces = ' '.repeat(Math.floor((bottomWidth - 1) / 2));
    const topCrown = wSpaces + 'W' + wSpaces;

    // Хардкодим второй ряд, потому что он не вписывается в паттерн кол-ва символов в ветках ёлки
    const starSpaces = ' '.repeat(Math.floor((bottomWidth - 1) / 2));
    const secondRow = starSpaces + '*' + starSpaces;

    // Ветки - на чётных ветках "игрушки" ('@') - слева, на нечётных - справа
    let tree = '';
    for (let i = 0; i < branchRows; i++) {
        const width = 6 + i * 4;
        const middle = width - 1;
        let row;
        if (i % 2 == 0) {
            row = '@' + '*'.repeat(middle);
        } else {
            row = '*'.repeat(middle) + '@';
        }
        const spaces = ' '.repeat(Math.floor((bottomWidth - width) / 2));

        tree += spaces + row + spaces + '\n';

    }

    // Ствол два ряда буквы Т - 5 символов
    const trunkSpaces = ' '.repeat(Math.floor((bottomWidth - trunkWidth) / 2));
    let treeBottom = '';
    for (let t = 0; t < trunkHeight; t++) {
        treeBottom += trunkSpaces + 'T'.repeat(trunkWidth) + trunkSpaces + '\n';
    }

    // Записываем полученные выводв в файл по пути указанному во входных данных
    require('fs').writeFileSync(outputPath, topCrown + '\n' + secondRow + '\n' + tree + treeBottom);

}
module.exports = drawCustomTree;
// Входные данные: Колво веток, путь для сохранения данных
drawCustomTree(18, './output/tree.txt');