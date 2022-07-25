import { prisma } from "../src/database/dbConfig.js";


async function __truncateTerms() {
    await prisma.$executeRaw`TRUNCATE TABLE terms RESTART IDENTITY CASCADE;`;
}

async function __upsertTerms() {
    await prisma.term.upsert({
        where: { number: 1 },
        update: {},
        create: { number: 1 },
    });
    await prisma.term.upsert({
        where: { number: 2 },
        update: {},
        create: { number: 2 },
    });
    await prisma.term.upsert({
        where: { number: 3 },
        update: {},
        create: { number: 3 },
    });
    await prisma.term.upsert({
        where: { number: 4 },
        update: {},
        create: { number: 4 },
    });
    await prisma.term.upsert({
        where: { number: 5 },
        update: {},
        create: { number: 5 },
    });
    await prisma.term.upsert({
        where: { number: 6 },
        update: {},
        create: { number: 6 },
    });
}

async function __truncateCategories() {
    await prisma.$executeRaw`TRUNCATE TABLE categories RESTART IDENTITY CASCADE;`;
}

async function __upsertCategories() {
    await prisma.category.upsert({
        where: { name: "Projeto" },
        update: {},
        create: { name: "Projeto"},
    });
    await prisma.category.upsert({
        where: { name: "Prática" },
        update: {},
        create: { name: "Prática"},
    });
    await prisma.category.upsert({
        where: { name: "Recuperação" },
        update: {},
        create: { name: "Recuperação"},
    });
}

async function __truncateTeachers() {
    await prisma.$executeRaw`TRUNCATE TABLE teachers RESTART IDENTITY CASCADE;`;
}

async function __upsertTeachers() {
    await prisma.teacher.upsert({
        where: { name: "Diego Pinho" },
        update: {},
        create: { name: "Diego Pinho"},
    });
    await prisma.teacher.upsert({
        where: { name: "Bruna Hamori" },
        update: {},
        create: { name: "Bruna Hamori"},
    });
}

async function __truncateDisciplines() {
    await prisma.$executeRaw`TRUNCATE TABLE disciplines RESTART IDENTITY CASCADE;`;
}

async function __upsertDisciplines() {
    await prisma.discipline.upsert({
        where: { name: "HTML e CSS" },
        update: { termId: 1 },
        create: { name: "HTML e CSS", termId: 1},
    });
    await prisma.discipline.upsert({
        where: { name: "JavaScript" },
        update: { termId: 2 },
        create: { name: "JavaScript", termId: 2},
    });
    await prisma.discipline.upsert({
        where: { name: "React" },
        update: { termId: 3 },
        create: { name: "React", termId: 3},
    });
    await prisma.discipline.upsert({
        where: { name: "Humildade" },
        update: { termId: 1 },
        create: { name: "Humildade", termId: 1},
    });
    await prisma.discipline.upsert({
        where: { name: "Planejamento" },
        update: { termId: 2 },
        create: { name: "Planejamento", termId: 2},
    });
    await prisma.discipline.upsert({
        where: { name: "Autoconfiança" },
        update: { termId: 3 },
        create: { name: "Autoconfiança", termId: 3},
    });
}

async function __truncateTeachersDisciplines() {
    await prisma.$executeRaw`TRUNCATE TABLE teachers_disciplines RESTART IDENTITY CASCADE;`;
}

async function __insertTeachersDisciplines() {
    await prisma.teacherDiscipline.create({
        data: { teacherId: 1, disciplineId: 1 },        
    });
    await prisma.teacherDiscipline.create({
        data: { teacherId: 1, disciplineId: 2 },        
    });
    await prisma.teacherDiscipline.create({
        data: { teacherId: 1, disciplineId: 3 },        
    });
    await prisma.teacherDiscipline.create({
        data: { teacherId: 2, disciplineId: 4 },
    });
    await prisma.teacherDiscipline.create({
        data: { teacherId: 2, disciplineId: 5 },
    });
    await prisma.teacherDiscipline.create({
        data: { teacherId: 2, disciplineId: 6 },
    });
}

async function main() {
    await __truncateTerms();
    await __upsertTerms();

    await __truncateCategories();
    await __upsertCategories();

    await __truncateTeachers();
    await __upsertTeachers();

    await __truncateDisciplines();
    await __upsertDisciplines();

    await __truncateTeachersDisciplines();
    await __insertTeachersDisciplines();
    

    /*
    adicionar categorias/disciplinas/professores/etc!!
    */
    console.log("CALLED_PRISMA_DB_SEED <<<<");
}

main().catch(err => {
    console.error(err);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});