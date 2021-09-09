import "reflect-metadata"
import { connect } from "../common/db/conn"
import getRouter from 'express-chunk-upload/get-router'
import { join } from 'path'
import express from 'express'


export default async (app) => {
  await connect()

  const uploadPath = join(__dirname, '..', '/uploads')
  app.use('/upload', getRouter({
    uploadPath
  }))

  app.use('/uploads', express.static(uploadPath))
}