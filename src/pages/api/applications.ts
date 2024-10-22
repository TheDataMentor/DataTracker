import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'
import { Application } from '@/types/application'

const dataFile = path.join(process.cwd(), 'data', 'applications.json')

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getApplications(req, res)
    case 'POST':
      return addApplication(req, res)
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

function getApplications(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (fs.existsSync(dataFile)) {
      const fileContent = fs.readFileSync(dataFile, 'utf-8')
      const applications = JSON.parse(fileContent)
      res.status(200).json(applications)
    } else {
      res.status(200).json([])
    }
  } catch (error) {
    res.status(500).json({ message: 'Error reading applications', error: error.message })
  }
}

function addApplication(req: NextApiRequest, res: NextApiResponse) {
  try {
    let applications: Application[] = []
    if (fs.existsSync(dataFile)) {
      const fileContent = fs.readFileSync(dataFile, 'utf-8')
      applications = JSON.parse(fileContent)
    }

    const newApplication: Application = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    applications.push(newApplication)

    fs.writeFileSync(dataFile, JSON.stringify(applications, null, 2))

    res.status(201).json({ message: 'Application added successfully', application: newApplication })
  } catch (error) {
    res.status(500).json({ message: 'Error adding application', error: error.message })
  }
}
