import json
from subprocess import call

with open('.ask/config') as f:
    data = json.load(f)

for x in data["deploy_settings"]["default"]["in_skill_products"]:
    print x["filePath"].replace("isps/entitlement/", "").replace("isps/subscription/", "").replace("isps/consumable/", "")
    call(["ask", "api", "reset-isp-entitlement", "-i", x["productId"]])
