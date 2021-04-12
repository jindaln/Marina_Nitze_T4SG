from django.contrib import admin
from .models import IssueArea, State, Implementation, Contact

class IssueAreaAdmin(admin.ModelAdmin):
    list_display = ('title', 'num_practices','intro_text','conclusion_text',
                'practice_1','practice_1_question','practice_1_description','practice_1_quote','practice_1_link','subpractices_1_names',
                'practice_2','practice_2_question','practice_2_description','practice_2_quote','practice_2_link','subpractices_2_names',
                'practice_3','practice_3_question','practice_3_description','practice_3_quote','practice_3_link','subpractices_3_names',
                'practice_4','practice_4_question','practice_4_description','practice_4_quote','practice_4_link','subpractices_4_names',
                'practice_5','practice_5_question','practice_5_description','practice_5_quote','practice_5_link','subpractices_5_names',
                'practice_6','practice_6_question','practice_6_description','practice_6_quote','practice_6_link','subpractices_6_names',
                'practice_7','practice_7_question','practice_7_description','practice_7_quote','practice_7_link','subpractices_7_names')

class StateAdmin(admin.ModelAdmin):
    list_display = ('name', 'abbreviation', 'population','county_administered')


class ImplementationAdmin(admin.ModelAdmin):
    list_display = ('state','issue_area','practice_1','subpractices_1','practice_2','subpractices_2','practice_3','practice_4',
                'practice_5','practice_6','practice_7')

class ContactAdmin(admin.ModelAdmin):
    list_display = ('issue_area', 'first_name', 'last_name','position', 'email')

# Register your models here.
admin.site.register(IssueArea, IssueAreaAdmin)
admin.site.register(State, StateAdmin)
admin.site.register(Implementation, ImplementationAdmin)
admin.site.register(Contact, ContactAdmin)



