build:
	web-ext sign -i .* Makefile *.md LICENSE --api-key $(API_KEY) --api-secret $(API_SECRET)
