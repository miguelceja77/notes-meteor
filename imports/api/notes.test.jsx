import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { Notes } from './notes';

if (Meteor.isServer) {
    describe('notes', function(){
        const noteOne = {
            _id: 'testNoteId',
            title: 'titulo',
            body: 'Mi descripción del body',
            updatedAt: 0,
            userId: 'testUserId'
        };
        const noteTwo = {
            _id: 'testNoteId2',
            title: 'titulo2',
            body: 'Mi descripción del body2',
            updatedAt: 0,
            userId: 'testUserId2'
        };
        beforeEach(function(){
            Notes.remove({})
            Notes.insert(noteOne)
            Notes.insert(noteTwo)
        })

        it('should insert new note', function(){
            const userId = 'testid'
            const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId });

            expect(Notes.findOne({ _id, userId })).toBeTruthy();
        });

        it('should not insert note if not authenticates', function () {
            expect(() => {
                Meteor.server.method_handlers['notes.insert']();
            }).toThrow();
        });

        it('should remove note', function(){
            Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId }, [noteOne._id])

        expect(Notes.findOne({ _id: noteOne._id})).toNotExist();            
        });

        it('que no lo remueva si no está autenticado', function(){
            expect(()=> {
                Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id]);
            }).toThrow();
        });

        it('No lo puede remover si tiene _id inválido', function () {
           expect(() => {
            Meteor.server.method_handlers['notes.remove'].apply({userId: noteOne.userId} )
           }).toThrow();
        });

        it('Debe actualizar la nota :)', function(){
            const title = 'This is el nuevo titulo';

            Meteor.server.method_handlers['notes.update'].apply({
                userId: noteOne.userId
            }, [
                noteOne._id,
                { title }
            ]);

            const note = Notes.findOne(noteOne._id);

            expect(note.updatedAt).toBeGreaterThan(0);
            expect(note).toInclude({
                title,
                body: noteOne.body
            });
        });

        it('Error por demasiadas actualizaciones', function () {
            expect(() => {
                Meteor.server.method_handlers['notes.update'].apply({
                    userId: noteOne.userId
                }, [
                    noteOne._id,
                    { title: 'new title', name: 'Mike de Huesca' }
                ]);
            }).toThrow();
        });

        it('No se puede actualizar una nota si no fue el usuario que la creó', function () {
            const title = 'This is el nuevo titulo';

            Meteor.server.method_handlers['notes.update'].apply({
                userId: 'testid'
            }, [
                noteOne._id,
                { title }
            ]);

            const note = Notes.findOne(noteOne._id);

            expect(note).toInclude(noteOne);
        });

        it('que no lo actualice si no está autenticado', function(){
            expect(()=> {
                Meteor.server.method_handlers['notes.update'].apply({}, [noteOne._id]);
            }).toThrow();
        });

        it('No lo puede actualizar si tiene _id inválido', function () {
           expect(() => {
            Meteor.server.method_handlers['notes.update'].apply({userId: noteOne.userId} )
           }).toThrow();
        });

        it('Traer las notas del usuario', function () {
            const res = Meteor.server.publish_handlers.notes.apply({ userId: noteOne.userId })
            const notes = res.fetch();

            expect(notes.length).toBe(1);
            expect(notes[0]).toEqual(noteOne);
        });

        it('Traer Zero notas si el usuario no tiene nada', function () {
            const res = Meteor.server.publish_handlers.notes.apply({ userId: 'testid' })
            const notes = res.fetch();

            expect(notes.length).toBe(0);
        });
    });
}