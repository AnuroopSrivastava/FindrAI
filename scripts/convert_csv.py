#!/usr/bin/env python3
"""Convert a CSV of tools to tools.json schema.
CSV columns expected: name,domain,category,pricing,description,tags (comma-separated)
Usage: python scripts/convert_csv.py input.csv output.json"""
import csv, json, sys
def slugify(name):
    s = name.lower().replace(' ','-').replace("'","").replace('.','').replace('·','').replace('/','-')
    return s
def main():
    if len(sys.argv)<3:
        print('Usage: script input.csv output.json')
        sys.exit(1)
    inp=sys.argv[1]; out=sys.argv[2]
    rows=[]
    with open(inp, newline='', encoding='utf-8') as f:
        reader=csv.DictReader(f)
        for r in reader:
            name=r.get('name') or r.get('Name')
            domain=r.get('domain') or r.get('website') or ''
            category=r.get('category') or 'Other'
            pricing=r.get('pricing') or 'Freemium'
            desc=r.get('description') or ''
            tags_raw=r.get('tags') or ''
            tags=[t.strip() for t in tags_raw.split('|') if t.strip()]
            slug=slugify(name)
            logo = f'https://logo.clearbit.com/{domain}' if domain else ''
            website = domain if domain.startswith('http') else f'https://{domain}' if domain else ''
            rows.append({'name':name,'slug':slug,'category':category,'pricing':pricing,'description':desc,'website':website,'logo':logo,'tags':tags})
    with open(out,'w',encoding='utf-8') as f:
        json.dump(rows,f,indent=2,ensure_ascii=False)
    print(f'Wrote {len(rows)} entries to {out}')
if __name__=='__main__':
    main()