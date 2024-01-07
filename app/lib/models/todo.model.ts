import { Schema, models, model, PopulatedDoc, Document } from "mongoose"

type TodoModelTypes = {
    user: string
    tasks: PopulatedDoc<TaskDataTypes & Document>
}

const todoSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    title: {
        type: String,
        required: true
    },
    // optional
    description: {
        type: String,
        default: null
    },
    date: {
        type: String,
        required: true
    },
    // optional
    topics: [
        {
            type: String
        }
    ],
    // default []
    tasks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Task',
        }
    ]
}, {
    timestamps: true
})


export const Todo = models.Todos || model<TodoModelTypes>('Todos', todoSchema)