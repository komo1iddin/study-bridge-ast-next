"use client"

import React from "react"
import { Button } from "./ui/button"

interface FileNamingExampleProps {
	title: string
	description?: string
}

export default function FileNamingExample({ 
	title, 
	description 
}: FileNamingExampleProps) {
	return (
		<div className="p-4 border rounded-md">
			<h2 className="text-xl font-semibold mb-2">{title}</h2>
			{description && <p className="text-muted-foreground mb-4">{description}</p>}
			<Button>Example Button</Button>
		</div>
	)
} 