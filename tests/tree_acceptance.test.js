
const fs = require('fs');
const path = require('path');
const drawCustomTree = require('../tree_test.js');

describe('drawCustomTree - приёмочные тесты', () => {

    const outputPath = path.join(__dirname, 'test_tree.txt');

    afterEach(() => {
        if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
    });

    test('Если количество веток меньше 1 то показана ошибка', () => {
        expect(() => drawCustomTree(0, outputPath).toThrow('Количество веток должно быть положительным целым числом > 1'));
    })
    test('Если путь к выходным данным не строка то показана ошибка', () => {
        expect(() => drawCustomTree(10, 10).toThrow('Путь должен быть строкой'));
    })
    test('Создаётся выходной файл с верным верхним первым и вторым рядом', () => {
        drawCustomTree(3, outputPath);
        const content = fs.readFileSync(outputPath, 'utf8').split('\n');

        // Первый ряд должен иметь "W" по центру
        expect(content[0].trim()).toBe('W');

        // Второй ряд должен иметь "*" по центру
        expect(content[1].trim()).toBe('*');
    });

    test('Первая ветка дожна иметь символ "@" вначале так как она нечётная и иметь 6 знаков', () => {
        drawCustomTree(3, outputPath);
        const lines = fs.readFileSync(outputPath, 'utf8').split('\n');

        // Третья строка это первая ветка
        const branch1 = lines[2].trim();
        expect(branch1.startsWith('@')).toBe(true); // начало строки с "@"
        expect(branch1.length).toBe(6); // 6 знаков для первой ветки по ТЗ
    });

    test('Вторая ветка должна иметь символ "@" в конце так тка она чётная и иметь 10 знаков', () => {
        drawCustomTree(3, outputPath);
        const lines = fs.readFileSync(outputPath, 'utf8').split('\n');

        const branch2 = lines[3].trim();
        expect(branch2.endsWith('@')).toBe(true);
        expect(branch2.length).toBe(10); // 10 знаков для второй ветки по ТЗ
    });

    test('Два последних ряда должны быть "Стволом" из пяти символов "Т"', () => {
        drawCustomTree(3, outputPath);
        const lines = fs.readFileSync(outputPath, 'utf8').split('\n');
        const trunkRows = lines.slice(-3, -1); // два последних ряда

        trunkRows.forEach(row => {
            const trimmed = row.trim();
            expect(trimmed).toBe('TTTTT');
        });
    });

    test('Последняя ветка должна иметь ширину в соответствии с формулой 6 + (n-1)*4', () => {
        const n = 7;
        drawCustomTree(n, outputPath);
        const lines = fs.readFileSync(outputPath, 'utf8').split('\n');

        const bottomBranch = lines[1 + 1 + n - 1].trim(); // W ряд + * ряд + n веток
        expect(bottomBranch.length).toBe(6 + (n - 1) * 4);
    });
});