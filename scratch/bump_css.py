import os
import glob

def bump_version():
    html_files = glob.glob('*.html')
    for file in html_files:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace ?v=11 or ?v=12 or missing version with ?v=15
        import re
        new_content = re.sub(r'href="css/style\.css(\?v=\d+)?"', r'href="css/style.css?v=15"', content)
        new_content = re.sub(r'src="js/components\.js(\?v=\d+)?"', r'src="js/components.js?v=15"', new_content)

        if content != new_content:
            with open(file, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {file}")

if __name__ == '__main__':
    bump_version()
